import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReportDetail, deleteReport, updateReport } from '../../api/apiClient';
import FormGroup from '../../components/FormGroup/FormGroup';
import './ReportDetail.css';
import Loading from '../../components/common/Loading/Loading';

const ReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedInUserId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false); //수정
  const [editedReport, setEditedReport] = useState(null); //수정

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReportDetail(reportId);
        setReport(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('신고 내용을 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteReport(reportId);
        alert('삭제가 완료되었습니다.'); // 삭제 성공 알림 추가
        navigate('/report/list');
      } catch (error) {
        console.error('신고 삭제 중 오류:', error);
        alert('삭제 중 오류가 발생했습니다.'); // 에러 발생 시 알림 추가
      }
    }
  };

  // 이메일 마스킹 함수
  const maskEmail = (email) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 3) + '*'.repeat(username.length - 3);
    return `${maskedUsername}@${domain}`;
  };

  // 결함 유형 한글 변환 함수
  const translateDefectType = (englishType) => {
    // 숫자 제거 정규식 추가
    const typeWithoutNumber = englishType.replace(/[0-9_]/g, '').trim();

    const defectTypes = {
      CRACK: '균열',
      crack: '균열',
      LEAK_WHITENING: '백태/누수',
      leak_whitening: '백태/누수',
      STEEL_DAMAGE: '강재 손상',
      steel_damage: '강재 손상',
      PAINT_DAMAGE: '도장 손상',
      paint_damage: '도장 손상',
      PaintDamage: '도장 손상',
      PEELING: '박리',
      peeling: '박리',
      Spalling: '박리',
      REBAR_EXPOSURE: '철근 노출',
      rebar_exposure: '철근 노출',
      Exposure: '철근 노출',
      UNKNOWN: '모름',
      unknown: '모름',
    };

    const normalizedType = typeWithoutNumber.toLowerCase();
    const matchedType = Object.entries(defectTypes).find(([key]) => key.toLowerCase() === normalizedType);

    return matchedType ? matchedType[1] : englishType;
  };

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;
  if (!report) return <div className="error">신고를 찾을 수 없습니다.</div>;

  // localStorage에서 현재 로그인한 사용자의 email과 userId를 가져옴
  const loggedInEmail = localStorage.getItem('email');
  const isAuthor = Number(report.userId) === Number(loggedInUserId);

  // 수정 함수
  const handleEdit = () => {
    setEditedReport({
      reportTitle: report.reportTitle,
      reportDescription: report.reportDescription,
      reportDetailAddress: report.reportDetailAddress,
      defectType: report.defectType,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('report', JSON.stringify(editedReport));
      // 이미지가 있다면 추가
      if (editedReport.images) {
        editedReport.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      await updateReport(reportId, formData);
      setIsEditing(false);
      // 업데이트 후 데이터 다시 불러오기
      const response = await getReportDetail(reportId);
      setReport(response.data.data);
    } catch (error) {
      console.error('신고 수정 중 오류:', error);
    }
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <div className="report-detail">
          <FormGroup>
            <h1>{report.reportTitle}</h1>
            <div className="report-meta">
              <span>작성자: {maskEmail(loggedInEmail)}</span>
              <span>주소: {report.reportDetailAddress}</span>
              <span>작성일: {new Date(report.reportDate).toLocaleString()}</span>
              <span>신고 결함 유형: {translateDefectType(report.defectType)}</span>
            </div>

            {isEditing ? (
              <div className="content-wrapper">
                <div className="left-column">
                  <h3>게시글 수정</h3>
                  <div className="report-content-edit">
                    <input
                      type="text"
                      value={editedReport.reportTitle}
                      onChange={(e) => setEditedReport({ ...editedReport, reportTitle: e.target.value })}
                      className="edit-input"
                      placeholder="제목을 입력하세요"
                    />
                    <textarea
                      value={editedReport.reportDescription}
                      onChange={(e) => setEditedReport({ ...editedReport, reportDescription: e.target.value })}
                      className="edit-textarea"
                      placeholder="내용을 입력하세요"
                    />
                  </div>
                  <div className="report-file">
                    <div className="file-info">
                      <span className="file-text">첨부 파일</span>
                    </div>
                    {report.images && report.images.length > 0 && (
                      <div className="image-list">
                        {report.images.map((image, index) => (
                          <div key={index} className="image-item">
                            <a href={image.reportImagePath} download={image.reportImageName}>
                              {image.reportImageName}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="right-column">
                  <h3>분석 결과</h3>
                  <div className="detection-result">
                    {report.detectionResult ? (
                      <p>
                        {Array.from(
                          new Set(report.detectionResult.split(',').map((type) => translateDefectType(type.trim())))
                        ).join(', ')}
                      </p>
                    ) : (
                      <p>빠른 조치가 필요한 결함은 발견되지 않았음</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="content-wrapper">
                <div className="left-column">
                  <h3>신고 내용</h3>
                  <div className="report-content">
                    <p>{report.reportDescription}</p>
                  </div>
                  <div className="report-file">
                    <div className="file-info">
                      <span className="file-text">첨부 파일</span>
                    </div>
                    {report.images && report.images.length > 0 && (
                      <div className="image-list">
                        {report.images.map((image, index) => (
                          <div key={index} className="image-item">
                            <a href={image.reportImagePath} download={image.reportImageName}>
                              {image.reportImageName}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="right-column">
                  <h3>분석 결과</h3>
                  <div className="detection-result">
                    {report.detectionResult ? (
                      <p>
                        {Array.from(
                          new Set(report.detectionResult.split(',').map((type) => translateDefectType(type.trim())))
                        ).join(', ')}
                      </p>
                    ) : (
                      <p>빠른 조치가 필요한 결함은 발견되지 않았음</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="edit-actions">
              {isEditing && (
                <>
                  <button onClick={() => setIsEditing(false)}>취소</button>
                  <button onClick={handleUpdate}>저장</button>
                </>
              )}
            </div>
          </FormGroup>

          <div className="report-actions">
            <button className="list-button" onClick={() => navigate('/report/list')}>
              목록으로
            </button>
            {isAuthor && !isEditing && (
              <>
                <button className="edit-button" onClick={handleEdit}>
                  수정
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
