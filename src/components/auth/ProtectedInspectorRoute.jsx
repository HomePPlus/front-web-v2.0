import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, isInspector } from "../../utils/auth";

const ProtectedInspectorRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  const hasInspectorRole = isInspector();

  if (!isAuth) {
    // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
    return <Navigate to="/auth" replace />;
  }

  if (!hasInspectorRole) {
    // INSPECTOR가 아닌 경우 홈페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedInspectorRoute;
