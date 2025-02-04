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

// JWT 토큰 디코딩 함수 추가
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // JWT의 payload 부분(두 번째 부분)을 디코딩
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

// 유저 정보 가져오기
export const getUserInfo = () => {
  const decodedToken = decodeToken();
  if (!decodedToken) return null;

  return {
    email: decodedToken.sub,
    role: decodedToken.role,
    // iat: decodedToken.iat,
    // exp: decodedToken.exp,
    // 토큰에 포함된 다른 정보들도 필요하다면 추가
  };
};
