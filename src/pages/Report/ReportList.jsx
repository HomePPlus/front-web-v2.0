import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReports, deleteReport } from "../../api/apiClient";
import PostList from "../Community/PostList";
import Pagination from "../../components/common/Pagination/Pagination";
import FormGroup from "../../components/FormGroup/FormGroup";
import "./ReportList.css";
import Loading from "../../components/common/Loading/Loading";
import { getUserInfo } from "../../utils/auth";
import SliderToggle from "../../components/common/Button/SliderToggle";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("mine");

  const userInfo = getUserInfo();
  const loggedInEmail = userInfo?.email;
  const loggedInUserId = userInfo?.userId;

  const handleViewModeToggle = (isAll) => {
    setViewMode(isAll ? "all" : "mine");
    setCurrentPage(1); // 토글 시 첫 페이지로 이동
  };

  const handleReportClick = (reportId, isAuthor) => {
    if (!isAuthor) {
      alert("본인이 작성한 글만 확인할 수 있습니다.");
      return;
    }
    navigate(`/report/${reportId}`);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReports();
        const formattedReports = response.data.data.map((report) => ({
          id: report.id,
          reportTitle: report.reportTitle,
          userId: report.userId,
          reportDate: report.reportDate,
          defectType: report.defectType,
        }));
        setReports(formattedReports);
        setLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchReports();
    }
  }, [userInfo]);

  const isAuthor = (reportUserId) => {
    return Number(reportUserId) === Number(userInfo?.userId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "";
      }
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername = username.slice(0, 3) + "*".repeat(username.length - 3);
    return `${maskedUsername}@${domain}`;
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const filteredReports = viewMode === "mine" ? reports.filter((report) => report.userId === loggedInUserId) : reports;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-wrapper">
      <div className="reportlist-container">
        <div className="report-board">
          <h1>신고 내역</h1>
          <SliderToggle onToggle={handleViewModeToggle} />
          <FormGroup>
            <table className="report-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>결함 유형</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report) => {
                  const isAuthor = Number(report.userId) === Number(loggedInUserId);

                  return (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>
                        <span
                          onClick={() => handleReportClick(report.id, isAuthor)}
                          style={{
                            cursor: isAuthor ? "pointer" : "not-allowed",
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          {isAuthor ? report.reportTitle : "비밀글입니다"}
                        </span>
                      </td>
                      <td>{isAuthor ? maskEmail(loggedInEmail) : "-"}</td>
                      <td>{isAuthor ? formatDate(report.reportDate) : "-"}</td>
                      <td>{isAuthor ? report.defectType : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination-container-report">
              <Pagination
                totalPage={Math.ceil(filteredReports.length / reportsPerPage)}
                page={currentPage}
                setPage={setCurrentPage}
              />
            </div>
          </FormGroup>
          <button className="button-report" onClick={() => navigate("/report")}>
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
