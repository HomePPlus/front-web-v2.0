import React, { useState, useEffect } from 'react';
import { getInspectionReports, updateInspectionStatus } from '../../api/apiClient';
import './InspectionTable.css';
import Loading from '../common/Loading/Loading';

const InspectionTable = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInspections = async () => {
    try {
      const response = await getInspectionReports();
      setInspections(response.data.data);
      console.log(response.data.data);
      setError(null);
    } catch (error) {
      setError('점검 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching inspections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handleStatusChange = async (inspectionId, newStatus) => {
    try {
      await updateInspectionStatus(inspectionId, newStatus);
      // 상태 변경 후 목록 새로고침
      fetchInspections();
    } catch (error) {
      console.error('상태 변경 실패:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="inspection-table-container">
      <h2>신고 점검 목록</h2>
      <table className="inspection-table">
        <thead>
          <tr>
            <th>점검 ID</th>
            <th>유형</th>
            <th>상태</th>
            <th>예정일</th>
            <th>완료일</th>
            <th>점검자</th>
            <th>신고 내용</th>
            <th>주소</th>
            <th>결함 유형</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((inspection) => (
            <tr key={inspection.inspectionId} className={`status-${inspection.status}`}>
              <td>{inspection.inspectionId}</td>
              <td>{inspection.type}</td>
              <td>
                <select
                  className={`status-select ${inspection.status}`}
                  value={inspection.status}
                  onChange={(e) => handleStatusChange(inspection.inspectionId, e.target.value)}
                >
                  <option value="예정됨">예정됨</option>
                  <option value="진행중">진행중</option>
                  <option value="완료됨">완료됨</option>
                  <option value="취소됨">취소됨</option>
                </select>
              </td>
              <td>{inspection.scheduleDate}</td>
              <td>{inspection.endDate || '-'}</td>
              <td>{inspection.inspectorName}</td>
              <td>{inspection.reportInfo.description}</td>
              <td>{inspection.reportInfo.detailAddress}</td>
              <td>{inspection.reportInfo.defectType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InspectionTable;
