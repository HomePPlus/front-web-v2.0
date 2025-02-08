import React, { useState, useEffect } from "react";
import "./UserReportTable.css";
import { getReservableReports, createInspectionReports } from "../../../api/apiClient";
import DatePicker from "react-datepicker"; // DatePicker 라이브러리 설치 필요
import "react-datepicker/dist/react-datepicker.css"; // DatePicker 스타일링

const UserReportTable = ({ onUpdateStats, onAlert }) => {
  const [reports, setReports] = useState([]); // 신고 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지
  const [selectedReportId, setSelectedReportId] = useState(null); // 선택한 신고 ID
  const [scheduleDate, setScheduleDate] = useState(new Date()); // 예약 날짜
  const [showDatePicker, setShowDatePicker] = useState(false); // DatePicker 표시 여부

  const fetchReports = async () => {
    try {
      const response = await getReservableReports();
      const availableReports = response.data.data.map(report => ({
        id: report.report_id,
        report_date: report.report_date,
        report_title: report.report_title,
        report_description: report.report_description,
        report_detail_address: report.report_detail_address,
        defect_type: report.defect_type,
        images: report.images,
        detection_result: report.detection_result
      }));
      setReports(availableReports);
      setError(null);
    } catch (error) {
      console.error("API Error:", error);
      setError("신고 목록을 불러오는데 실패했습니다.");
      onAlert("신고 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReserve = async () => {
    if (!selectedReportId) {
      alert("신고를 선택해주세요.");
      return;
    }

    const requestData = {
      reportId: selectedReportId,
      scheduleDate: scheduleDate.toISOString().split("T")[0],
    };

    try {
      const response = await createInspectionReports(requestData);
      alert(response.data.message || "예약이 성공적으로 등록되었습니다.");
      fetchReports();
      setShowDatePicker(false);
      setSelectedReportId(null);
      onUpdateStats(); // API를 통해 최신 통계 가져오기
    } catch (error) {
      console.error("API Error:", error);
      onAlert("예약 등록에 실패했습니다.");
    }
  };

  const handleSchedule = (reportId) => {
    setSelectedReportId(reportId);
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() === today.getTime()) {
      onAlert("오늘 날짜는 예약할 수 없습니다. 다른 날짜를 선택해주세요.");
      return;
    }
    setScheduleDate(date);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="userReport-error">{error}</div>;

  return (
    <div className="userReport-table-container">
      <table className="userReport-table">
        <thead>
          <tr>
            <th>신고 ID</th>
            <th>신고일</th>
            <th>신고 내용</th>
            <th>주소</th>
            <th>결함 유형</th>
            <th>예약하기</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{formatDate(report.report_date)}</td>
                <td>{report.report_description}</td>
                <td>{report.report_detail_address}</td>
                <td>{report.defect_type}</td>
                <td>
                  <button className="userReport-schedule-button" onClick={() => handleSchedule(report.id)}>
                    예약하기
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showDatePicker && (
        <>
          <div className="datepicker-overlay" onClick={() => setShowDatePicker(false)} />
          <div className="userReport-datepicker-container">
            <div className="datepicker-wrapper">
              <DatePicker
                selected={scheduleDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                inline
              />
              <div className="datepicker-buttons">
                <button 
                  className="userReport-datepicker-submit-button" 
                  onClick={handleReserve}
                >
                  예약하기
                </button>
                <button 
                  className="userReport-datepicker-cancel-button" 
                  onClick={() => {
                    setShowDatePicker(false);
                    setSelectedReportId(null);
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserReportTable;
