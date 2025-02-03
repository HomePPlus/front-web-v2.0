import React, { useState } from "react";
import Calendar from "react-calendar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {getTodayInspections} from "../../../api/apiClient";
import "./MiniCalendar.css";

const MiniCalendar = () => {
  // 달력의 날짜 상태
  const [value, onChange] = useState(new Date());
  
  // 다크 모드 상태 (현재 사용되지 않음)
  const [isDarkMode] = useState(false);
  
  // 점검 정보 상태
  const [inspections, setInspections] = useState([]);
  
  // 모달 표시 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 달력 날짜 클릭 이벤트 핸들러
  const handleDateClick = async (date) => {
    try {
      // 로컬 시간대를 사용하여 날짜를 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate); // 선택한 날짜가 잘 생성되었는지 확인
      
      // API 요청으로 점검 정보를 가져옴
      const response = await getTodayInspections(formattedDate);
      
      // 가져온 점검 정보를 상태에 저장
      setInspections(response.data.data);
      
      // 모달을 열음
      setIsModalOpen(true);
    } catch (error) {
      console.error("점검 일정 조회 실패:", error);
    }
  };

  // 모달 닫기 이벤트 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`calendar-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
      <Calendar
        onChange={onChange}
        value={value}
        view="month"
        prevLabel={<MdChevronLeft size={24} />}
        nextLabel={<MdChevronRight size={24} />}
        navigationLabel={({ date }) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        onClickDay={handleDateClick}
      />
      
      {/* 모달 */}
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
  );
};

export default MiniCalendar;
