// Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import InspectionStats from '../../components/inspection/InspectionStats';
import InspectionTable from '../../components/inspection/InspectionTable';
import TodayInspection from '../../components/inspection/TodayInspection';
import DefectStats from '../../components/dashboard/DefectStats';
import MiniCalendar from '../../components/common/Calendar/MiniCalendar';
import Sidebar from '../../components/Sidebar/Sidebar';
import NaverMap from '../../components/dashboard/map/NaverMap';
import ChecklistPage from './ChecklistPage';
import { getTodayInspections } from '../../api/apiClient';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspections, setInspections] = useState([]);

  const handleDateClick = async (date) => {
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const response = await getTodayInspections(formattedDate);
      setInspections(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('점검 일정 조회 실패:', error);
    }
  };

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar onViewChange={(view) => setActiveView(view)} activeView={activeView} />
      <div className={`dashboard-container ${activeView === '체크리스트' ? 'checklist-view-enabled' : ''}`}>
        {activeView === '체크리스트' ? (
          <div className="checklist-page-container">
            <ChecklistPage />
          </div>
        ) : activeView === '전체' ? (
          <div className="total-dashboard-view">
            <div className="map-container">
              <NaverMap />
            </div>
            <div className="stats-container">
              <DefectStats />
            </div>
          </div>
        ) : (
          <div className="my-area-dashboard">
            <div className="inspection-list-row">
              <div className="dashboard-item inspection-list">
                <InspectionTable />
              </div>
            </div>
            <div className="dashboard-bottom-row">
              <div className="dashboard-item">
                <InspectionStats />
              </div>
              <div className="dashboard-item">
                <MiniCalendar onDateClick={handleDateClick} />
              </div>
              <div className="dashboard-item">
                <TodayInspection />
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>점검 상세 정보</h2>
              {inspections.length > 0 ? (
                inspections.map((inspection, index) => (
                  <div key={index} className="inspection-item">
                    <h3>점검 {index + 1}</h3>
                    <p>날짜: {inspection.scheduleDate}</p>
                    <p>상태: {inspection.status}</p>
                    {inspection.reportInfo && (
                      <>
                        <p>위치: {inspection.reportInfo.detailAddress}</p>
                        <p>신고 내용: {inspection.reportInfo.description}</p>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>오늘 예약이 없습니다.</p>
              )}
              <button onClick={handleCloseModal}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
