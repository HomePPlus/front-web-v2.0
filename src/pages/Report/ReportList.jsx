import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReports, deleteReport } from "../../api/apiClient";
import PostList from "../Community/PostList";
import Pagination from "../../components/common/Pagination/Pagination";
import FormGroup from "../../components/FormGroup/FormGroup";
import "./ReportList.css";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // 신고 삭제 처리
  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport(reportId);
      setReports(reports.filter(report => report.id !== reportId));
    } catch (error) {
      console.error("신고 삭제 중 오류:", error);
      alert("신고 삭제 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReports();
        setReports(response.data.data); // 응답 구조에 맞게 수정
        setLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '';
      }
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-board">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}>
        <h1>신고 내역</h1>
        <FormGroup>
          <table className="report-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
                <th>작성일</th>
                <th>조회수</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.reportTitle}</td>
                  <td>{report.reportDescription}</td>
                  <td>{formatDate(report.reportDate)}</td>
                  <td>{report.defectType}</td>
                  <td>
                    <button onClick={() => handleDeleteReport(report.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container-report">
            <Pagination
              totalPage={Math.ceil(reports.length / reportsPerPage)}
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
  );
};


export default ReportList;
