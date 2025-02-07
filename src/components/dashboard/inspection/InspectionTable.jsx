import React, { useState, useEffect } from "react";
import { getInspectionReports, updateInspectionStatus } from "../../../api/apiClient";
import "./InspectionTable.css";
import Loading from "../../common/Loading/Loading";

const InspectionTable = ({ onAlert }) => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInspections = async () => {
    try {
      const response = await getInspectionReports();
      const data = response.data.data.map((item) => ({
        ...item,
        report_info: item.report_info || {},
      }));
      console.log(data);
      setInspections(data);
    } catch (error) {
      setError("점검 목록을 불러오는데 실패했습니다.");
      onAlert("점검 목록을 불러오는데 실패했습니다."); // 대시보드로 알람 전달
      console.error("Error fetching inspections:", error);
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
      fetchInspections(); // 상태 변경 후 목록 새로고침
    } catch (error) {
      console.error("상태 변경 실패:", error);
      onAlert("상태 변경에 실패했습니다."); // 대시보드로 알람 전달
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="inspection-table-container">
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
            <tr key={inspection.inspection_id} className={`status-${inspection.status}`}>
              <td>{inspection.inspection_id}</td>
              <td>{inspection.type}</td>
              <td>
                <select
                  className={`status-select ${inspection.status}`}
                  value={inspection.status}
                  onChange={(e) => handleStatusChange(inspection.inspection_id, e.target.value)}
                >
                  <option value="예정됨">예정됨</option>
                  <option value="진행중">진행중</option>
                  <option value="완료됨">완료됨</option>
                  <option value="취소됨">취소됨</option>
                </select>
              </td>
              <td>{inspection.schedule_date || "-"}</td>
              <td>{inspection.end_date || "-"}</td>
              <td>{inspection.inspector_name || "-"}</td>
              {/* 안전하게 접근 */}
              <td>{inspection.report_info?.description || "-"}</td>
              <td>{inspection.report_info?.detail_address || "-"}</td>
              <td>{inspection.report_info?.defect_type || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InspectionTable;
