import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import InspectionStats from '../../components/inspection/InspectionStats';
import InspectionTable from "../../components/inspection/InspectionTable";
import TodayInspection from '../../components/inspection/TodayInspection';
import DefectStats from '../../components/dashboard/DefectStats';
import MiniCalendar from "../../components/common/Calendar/MiniCalendar";

// Dashboard.jsx
// Dashboard.jsx
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* 왼쪽 섹션 */}
        <div className="left-section">
          <div className="dashboard-item defect-stats">
            <DefectStats />
          </div>
          <div className="dashboard-item inspection-table">
            <InspectionTable />
          </div>
        </div>
        
        {/* 오른쪽 섹션 */}
        <div className="right-section">
          <div className="dashboard-item inspection-stats">
            <InspectionStats />
          </div>
          <div className="dashboard-item today-inspection">
            <TodayInspection />
          </div>
          <div className="dashboard-item calendar">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
