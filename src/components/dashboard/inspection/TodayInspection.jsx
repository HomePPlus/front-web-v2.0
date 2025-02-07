import React, { useState, useEffect } from "react";
import { apiClient } from "../../../api/apiClient";
import "./TodayInspection.css";

const TodayInspection = () => {
  const [inspections, setInspections] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayInspections = async () => {
      try {
        const response = await apiClient.get("/api/inspections/today");
        // 모든 데이터의 report_info와 detail_address 로깅
        response.data.data.forEach((inspection, index) => {
          console.log(`점검 ${index + 1}의 데이터:`, {
            report_info: inspection.report_info,
            detail_address: inspection.report_info?.detail_address,
          });
        });
        setInspections(response.data.data);
        setMessage(response.data.message);
        setError(null);
      } catch (error) {
        setError("오늘의 점검 일정을 불러오는데 실패했습니다.");
        console.error("Error fetching today's inspections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayInspections();
  }, []);

  const getStatusClassName = (status) => {
    switch (status) {
      case "예정됨":
        return "status-scheduled";
      case "진행중":
        return "status-in-progress";
      case "완료됨":
        return "status-completed";
      default:
        return "";
    }
  };

  if (loading) return "로딩중...";
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="today-inspection-container">
      <h2>오늘의 점검</h2>
      {inspections.length === 0 ? (
        <div className="no-inspection-message">{message}</div>
      ) : (
        <div className="inspection-cards">
          {inspections.map((inspection) => {
            // 각 inspection의 report_info 안전하게 접근
            const reportInfo = inspection.report_info || {};
            return (
              <div key={inspection.inspection_id} className="inspection-card">
                <div className="inspection-header">
                  <span className="inspection-type">{inspection.type}</span>
                  <span className={`inspection-status ${getStatusClassName(inspection.status)}`}>
                    {inspection.status}
                  </span>
                </div>
                <div className="inspection-body">
                  <div className="inspection-detail">
                    <strong>점검자:</strong> {inspection.inspector_name}
                  </div>
                  <div className="inspection-detail">
                    <strong>예정일:</strong> {inspection.schedule_date}
                  </div>
                  <div className="inspection-detail">
                    <strong>주소:</strong> {reportInfo.detail_address || "-"}
                  </div>
                  <div className="inspection-detail">
                    <strong>결함 유형:</strong> {reportInfo.defect_type || "-"}
                  </div>
                  <div className="inspection-description">
                    <strong>설명:</strong> {reportInfo.description || "-"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodayInspection;
