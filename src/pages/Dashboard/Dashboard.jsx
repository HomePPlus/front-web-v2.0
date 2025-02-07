import React, { useState } from "react";
import "./Dashboard.css";
import InspectionStats from "../../components/dashboard/inspection/InspectionStats";
import InspectionTable from "../../components/dashboard/inspection/InspectionTable";
import TodayInspection from "../../components/dashboard/inspection/TodayInspection";
import DefectStats from "../../components/dashboard/DefectStats";
import MiniCalendar from "../../components/common/Calendar/MiniCalendar";
import Sidebar from "../../components/Sidebar/Sidebar";
import NaverMap from "../../components/dashboard/map/NaverMap";
import ChecklistPage from "./ChecklistPage";
import { getTodayInspections } from "../../api/apiClient";
import InspectionTabs from "../../components/dashboard/inspection/InspectionTabs";
import UserReportTable from "../../components/dashboard/userReportTable/UserReportTable"; // 신고 목록 컴포넌트

const Dashboard = () => {
  const [activeView, setActiveView] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspections, setInspections] = useState([]);
  const [reports, setReports] = useState([]); // 신고 데이터를 저장
  const [alerts, setAlerts] = useState([]); // 알람 메시지 저장

  // 점검 데이터와 신고 데이터를 구분
  const userReports = reports.filter((report) => report.type === "신고");
  const inspectionReports = inspections.filter((inspection) => inspection.type === "점검");

  const handleAlert = (message) => {
    setAlerts((prevAlerts) => [...prevAlerts, message]);
  };

  const handleDateClick = async (date) => {
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate);
      const response = await getTodayInspections(formattedDate);
      // 응답 구조에 맞게 수정
      if (response.data && response.data.data) {
        console.log(response.data.data);
        setInspections(response.data.data); // API 응답에서 점검 목록을 가져옴
      } else {
        setInspections([]); // 데이터가 없을 경우 빈 배열로 초기화
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("점검 일정 조회 실패:", error);
    }
  };

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar onViewChange={(view) => setActiveView(view)} activeView={activeView} />
      <div className={`dashboard-container ${activeView === "체크리스트" ? "checklist-view-enabled" : ""}`}>
        {activeView === "체크리스트" ? (
          <div className="checklist-page-container">
            <ChecklistPage />
          </div>
        ) : activeView === "전체" ? (
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
                <InspectionTabs onAlert={handleAlert} userReports={userReports} inspectionReports={inspectionReports} />
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
              {alerts.length > 0 && (
                <div className="alert-container">
                  <h2>알람 메시지</h2>
                  <ul>
                    {alerts.map((alert, index) => (
                      <li key={index}>{alert}</li>
                    ))}
                  </ul>
                </div>
              )}
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
                    <p>날짜: {inspection.schedule_date}</p> {/* schedule_date로 수정 */}
                    <p>상태: {inspection.status}</p>
                    {inspection.report_info && (
                      <>
                        <p>위치: {inspection.report_info.detail_address}</p> {/* detail_address로 수정 */}
                        <p>신고 내용: {inspection.report_info.description}</p>
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