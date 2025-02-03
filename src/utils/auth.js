import Cookies from "js-cookie";

// 방법 1: HttpOnly가 false인 경우
export const getToken = () => Cookies.get("JWT_TOKEN");

// 방법 2: 인증 상태만 확인 (권장)
export const isAuthenticated = () => Cookies.get("isAuthenticated") === "true";

export const setToken = (token) => Cookies.set("JWT_TOKEN", token);

export const removeToken = () => Cookies.remove("JWT_TOKEN");
