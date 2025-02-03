import React, { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
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

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="today-inspection-container">
      <h2>오늘의 점검</h2>
      {inspections.length === 0 ? (
        <div className="no-inspection-message">{message}</div>
      ) : (
        <div className="inspection-cards">
          {inspections.map((inspection) => (
            <div key={inspection.inspectionId} className="inspection-card">
              <div className="inspection-header">
                <span className="inspection-type">{inspection.type}</span>
                <span className={`inspection-status ${inspection.status}`}>
                  {inspection.status}
                </span>
              </div>
              <div className="inspection-body">
                <div className="inspection-detail">
                  <strong>점검자:</strong> {inspection.inspectorName}
                </div>
                <div className="inspection-detail">
                  <strong>예정일:</strong> {inspection.scheduleDate}
                </div>
                <div className="inspection-detail">
                  <strong>주소:</strong> {inspection.reportInfo.detailAddress}
                </div>
                <div className="inspection-detail">
                  <strong>결함 유형:</strong> {inspection.reportInfo.defectType}
                </div>
                <div className="inspection-description">
                  <strong>설명:</strong> {inspection.reportInfo.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayInspection;
