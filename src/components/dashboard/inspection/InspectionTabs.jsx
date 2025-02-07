import React, { useState } from "react";
import InspectionTable from "./InspectionTable";
import UserReportTable from "../userReportTable/UserReportTable";
import "./InspectionTabs.css";

const InspectionTabs = ({ userReports, inspectionReports, onAlert }) => {
  const [activeTab, setActiveTab] = useState("reports"); // 기본 탭 설정

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="inspection-tabs-container">
      {/* 탭 버튼 */}
      <div className="inspection-tabs">
        <input
          type="radio"
          id="reports-tab"
          name="inspection-tabs"
          value="reports"
          checked={activeTab === "reports"}
          onChange={() => handleTabChange("reports")}
          className="tab-input"
        />
        <label htmlFor="reports-tab" className={`tab-label ${activeTab === "reports" ? "active" : ""}`}>
          신고 목록
        </label>

        <input
          type="radio"
          id="inspections-tab"
          name="inspection-tabs"
          value="inspections"
          checked={activeTab === "inspections"}
          onChange={() => handleTabChange("inspections")}
          className="tab-input"
        />
        <label htmlFor="inspections-tab" className={`tab-label ${activeTab === "inspections" ? "active" : ""}`}>
          점검 목록
        </label>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {activeTab === "reports" && <UserReportTable reports={userReports} onAlert={onAlert} />}
        {activeTab === "inspections" && <InspectionTable inspections={inspectionReports} onAlert={onAlert} />}
      </div>
    </div>
  );
};

export default InspectionTabs;
