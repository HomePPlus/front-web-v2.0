import Cookies from "js-cookie";

// 방법 1: HttpOnly가 false인 경우
export const getToken = () => Cookies.get("JWT_TOKEN");

// 인증 상태 관리
export const isAuthenticated = () => Cookies.get("isAuthenticated") === "true";
export const setAuthenticated = (bool) => Cookies.set("isAuthenticated", bool);

export const removeAuthenticated = () => Cookies.remove("isAuthenticated");

export const setToken = (token) => Cookies.set("JWT_TOKEN", token);

export const removeToken = () => {
  Cookies.remove("JWT_TOKEN");
  removeAuthenticated(); // 토큰이 제거되면 인증 상태도 제거
  removeUserType();
};

// userType 관리
export const setUserType = (type) => Cookies.set("userType", type);
export const getUserType = () => Cookies.get("userType");
export const removeUserType = () => Cookies.remove("userType");

// INSPECTOR 권한 확인
export const isInspector = () => getUserType() === "INSPECTOR";
