import React, { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import "./InspectionStats.css";

const InspectionStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get(
          "/api/inspections/statistics/inspector"
        );
        setStats(response.data.data);
        setError(null);
      } catch (error) {
        setError("통계 정보를 불러오는데 실패했습니다.");
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return null;

  return (
    <div className="stats-container">
      <h2>점검 현황</h2>
      <div className="stats-grid">
        <div className="stat-card scheduled">
          <h3>예정됨</h3>
          <span className="stat-number">{stats["예정됨"] || 0}</span>
        </div>
        <div className="stat-card in-progress">
          <h3>진행중</h3>
          <span className="stat-number">{stats["진행중"] || 0}</span>
        </div>
        <div className="stat-card completed">
          <h3>완료됨</h3>
          <span className="stat-number">{stats["완료됨"] || 0}</span>
        </div>
        <div className="stat-card cancelled">
          <h3>취소됨</h3>
          <span className="stat-number">{stats["취소됨"] || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default InspectionStats;
