import axios from "axios";
import serverConfig from "../config/serverConfig";

export const apiClient = axios.create({
  baseURL: serverConfig.serverUrl,
  withCredentials: true,
});

// * Health check API
export const checkServerHealth = async () => {
  console.log(
    "API URL (env 파일 잘 읽어오는 지 확인용):",
    process.env.REACT_APP_API_URL
  );
  try {
    const response = await apiClient.get("/api/health");
    if (response.data === "OK") {
      console.log("서버 연결 성공");
      return true;
    }
  } catch (error) {
    console.error("서버 연결 실패:", error);
    return false;
  }
};

// * 회원가입 관련 API
// 입주민 회원가입
export const registerResident = (data) =>
  apiClient.post("/api/users/resident/join", data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

//점검자 회원가입
export const registerInspector = (data) =>
  apiClient.post("/api/users/inspector/join", data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

// * 이메일 관련 API
export const checkEmail = (email) =>
  apiClient.get(`/api/users/check-email`, { params: { email } });

export const sendVerificationCode = (email) =>
  apiClient.post(`/api/users/send-verification`, null, { params: { email } });

export const verifyEmail = (email, code) => 
  apiClient.post(`/api/users/verify-code`, {}, {  // 빈 객체를 본문으로 전송
    params: { email, code },
    headers: { 'Content-Type': 'application/json' }  // 명시적 헤더 설정
  });

// * 로그인 관련 API
export const login = (data) => apiClient.post("/api/auth/login", data);

// export const getProfile = () =>
//   apiClient.get("/api/users/profile", {
//     headers: {
//       Authorization: getCookie("tokenKey"),
//     },
//   });

// * 입주민 커뮤니티 관련 API

// * 신고 점검 일정 관련 API
export const getReportSchedules = () => apiClient.get("/api/schedules/reports");

export const createReportSchedule = (data) =>
  apiClient.post("/api/schedules/reports", data);

export const getReportScheduleDetail = (scheduleId) =>
  apiClient.get(`/api/schedules/reports/${scheduleId}`);

// * 정기 점검 일정 관련 API
export const getRegularSchedules = () =>
  apiClient.get("/api/schedules/regular");

export const createRegularSchedule = (data) =>
  apiClient.post("/api/schedules/regular", data);

export const getRegularScheduleDetail = (scheduleId) =>
  apiClient.get(`/api/schedules/regular/${scheduleId}`);

// * 결함 검출 관련 API
export const createDefect = (formData) =>
  apiClient.post("/api/model/detect", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
