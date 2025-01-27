import React, { useState, useEffect } from 'react';
import './InspectorDashboard.css';
import { getReportSchedules, createReportSchedule, getRegularSchedules, createRegularSchedule } from '../../api/apiClient';

const InspectorDashboard = () => {
  const [reports, setReports] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [reportSchedulesResponse, regularSchedulesResponse] = await Promise.all([
        getReportSchedules(),
        getRegularSchedules()
      ]);
      
      setReports(reportSchedulesResponse.data.data || []);
      setSchedules(regularSchedulesResponse.data.data || []);
      // Assuming you have a function to fetch map data
      // const mapDataResponse = await fetchMapData();
      // setMapData(mapDataResponse.data);
    } catch (err) {
      setError('데이터를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (index, date) => {
    try {
      const updatedSchedule = { ...schedules[index], scheduleDate: date };
      const response = await createRegularSchedule(updatedSchedule);
      if (response.data.status === 200) {
        const newSchedules = [...schedules];
        newSchedules[index] = response.data.data;
        setSchedules(newSchedules);
      }
    } catch (err) {
      console.error('일정 업데이트 실패:', err);
    }
  };

  const handleReportSchedule = async (reportId) => {
    try {
      const response = await createReportSchedule({ reportId });
      if (response.data.status === 200) {
        setReports([...reports, response.data.data]);
      }
    } catch (err) {
      console.error('신고 일정 생성 실패:', err);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wrapper">
      <div className="left-side">
        {/* 사이드바 내용 */}
      </div>
      <div className="main-container">
        <header className="header">
          <h1>점검자 대시보드</h1>
        </header>
        <div className="user-box">
          <div className="card report-list">
            <h2>신고내역</h2>
            {reports.map((report, index) => (
              <div key={index} className="report-item">
                <span>{report.report.description}</span>
                <span>{report.report.detailAddress}</span>
                <button onClick={() => handleReportSchedule(report.report.reportId)}>
                  일정 예약
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="user-box">
          <div className="card schedule-management">
            <h2>일정관리</h2>
            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-item">
                <span>{schedule.inspectorName}</span>
                <input
                  type="date"
                  value={schedule.scheduleDate.split('T')[0]}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="user-box">
          <div className="card map-section">
            <h2>신고 위치 지도</h2>
            <div className="map-container">
              {mapData ? (
                <div>지도가 여기에 표시됩니다</div>
              ) : (
                <div>지도 데이터를 불러오는 중...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorDashboard;
