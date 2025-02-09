import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadChecklist } from '../../../api/apiClient';
import './ChecklistComplete.css';

const ChecklistComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { inspectionId, message } = location.state || {};

  const handleDownload = async () => {
    try {
      const response = await downloadChecklist(inspectionId);
      
      // Content-Type 확인
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('PDF가 아닌 형식의 응답을 받았습니다.');
      }

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inspection_report_${inspectionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // 메모리 해제
    } catch (error) {
      console.error('PDF 다운로드 실패:', error);
      alert('PDF 다운로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="checklist-complete-container">
      <div className="complete-content">
        <h1>체크리스트 제출 완료</h1>
        <p>{message || "체크리스트가 성공적으로 제출되었습니다."}</p>
        <div className="complete-actions">
          <button onClick={handleDownload} className="download-btn">
            PDF 다운로드
          </button>
          <button onClick={() => navigate('/dashboard')} className="return-btn">
            대시보드로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistComplete; 