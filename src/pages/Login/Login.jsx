import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import backgroundImage from "../../assets/images/busan.jpg"; // 이미지 경로는 실제 이미지 위치에 맞게 수정
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="background-container">
        <img src={backgroundImage} alt="Background" />
      </div>
      <div className="form-container">
        <div className="auth-form-wrapper">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
