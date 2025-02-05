import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllReports, deleteReport } from '../../api/apiClient';
import PostList from '../Community/PostList';
import Pagination from '../../components/common/Pagination/Pagination';
import FormGroup from '../../components/FormGroup/FormGroup';
import './ReportList.css';
import Loading from '../../components/common/Loading/Loading';
import { getUserInfo } from '../../utils/auth';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // localStorage 대신 쿠키나 디코딩된 토큰에서 정보 가져오기
  const userInfo = getUserInfo();
  const loggedInEmail = userInfo?.email;
  const loggedInUserId = userInfo?.userId;

  const handleReportClick = (reportId, isAuthor) => {
    if (!isAuthor) {
      alert('본인이 작성한 글만 확인할 수 있습니다.');
      return;
    }
    navigate(`/report/${reportId}`);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReports();
        // 필요한 필드만 추출
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
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };
    // 로그인 상태일 때만 데이터 가져오기
    if (userInfo) {
      fetchReports();
    }
  }, [userInfo]); // userInfo를 의존성 배열에 추가

  // userId 비교 로직 수정
  const isAuthor = (reportUserId) => {
    return Number(reportUserId) === Number(userInfo?.userId);
  };

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
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  // 이메일 마스킹 함수
  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 3) + '*'.repeat(username.length - 3);
    return `${maskedUsername}@${domain}`;
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-wrapper">
      <div className="reportlist-container">
        <div className="report-board">
          <h1>신고 내역</h1>
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
                  console.log('Report Data:', {
                    reportId: report.id,
                    reportUserId: report.userId,
                    loggedInUserId: loggedInUserId,
                  });

                  // userId 비교
                  const isAuthor = Number(report.userId) === Number(loggedInUserId);
                  console.log('Is Author:', isAuthor);

                  const handleClick = (e) => {
                    if (!isAuthor) {
                      e.preventDefault();
                      alert('본인이 작성한 글만 확인할 수 있습니다.');
                      return;
                    }
                  };

                  return (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>
                        <span
                          onClick={() => handleReportClick(report.id, isAuthor)}
                          style={{
                            cursor: isAuthor ? 'pointer' : 'not-allowed',
                            textDecoration: 'none',
                            color: 'inherit',
                          }}
                        >
                          {isAuthor ? report.reportTitle : '비밀글입니다'}
                        </span>
                      </td>
                      <td>{isAuthor ? maskEmail(loggedInEmail) : '-'}</td>
                      <td>{isAuthor ? formatDate(report.reportDate) : '-'}</td>
                      <td>{isAuthor ? report.defectType : '-'}</td>
                    </tr>
                  );
                })}
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
          <button className="button-report" onClick={() => navigate('/report')}>
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
