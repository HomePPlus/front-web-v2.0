import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import { login } from "../../api/apiClient";
import { setUserType, setToken, getToken } from "../../utils/auth";
import Cookies from "js-cookie";
import "./Auth.css";

import {
  registerResident,
  registerInspector,
  sendVerificationCode,
  verifyEmail,
  checkEmail,
} from "../../api/apiClient";

function Auth() {
  const navigate = useNavigate();
  // 로그인 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  // 회원가입 상태
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const [codeRequestTime, setCodeRequestTime] = useState(null); // 인증 코드 요청 시간
  const [isCodeExpired, setIsCodeExpired] = useState(false); // 코드 만료 상태

  // 로그인 성공 시 사용자 정보를 쿠키에 저장
  const handleLoginSuccess = (email, userId) => {
    Cookies.set("email", email, { expires: 1 }); // 만료일 설정
    Cookies.set("userId", userId, { expires: 1 }); // 만료일 설정
  };

  // 로그인 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      if (response.data.status === 200) {
        // 응답 데이터에서 토큰을 직접 가져와서 저장
        const token = response.data.data.token;
        setToken(token);
        setUserType(response.data.data.userType);
        // userId를 쿠키에 저장
        Cookies.set("userId", response.data.data.userId);

        // 루트 페이지로 이동 후 새로고침
        navigate("/", { replace: true }); // replace: true로 설정하여 뒤로가기 방지
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 인증 핸들러
  const handleEmailVerification = async (email) => {
    try {
      const checkResponse = await checkEmail(email);
      if (checkResponse.data.status === 200) {
        // 이미 인증 코드가 전송된 이메일인지 확인
        if (checkResponse.data.isCodeSent) {
          alert("이미 인증 코드가 전송된 이메일입니다.");
          return; // 함수 종료
        }

        const response = await sendVerificationCode(email);
        if (response.data.status === 200) {
          alert(response.data.message);
          setShowEmailVerification(true);
          setCodeRequestTime(Date.now()); // 현재 시간을 저장
          setIsCodeExpired(false); // 코드 만료 상태 초기화
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      setVerificationError(errorMessage || "인증 코드 전송에 실패했습니다.");
      alert(errorMessage);
    }
  };

  // 인증 코드 확인 핸들러
  const handleVerifyCode = async () => {
    try {
      // 반드시 email과 code 모두 전달
      const response = await verifyEmail(registerEmail, verificationCode);
      if (response.data.status === 200) {
        setIsEmailVerified(true);
        setVerificationError("");
        alert("인증 성공: " + response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "인증 처리 실패";
      setVerificationError(errorMessage);
      alert("오류: " + errorMessage);
    }
  };

  // 회원가입 핸들러
  const handleRegister = async (userType, userData) => {
    try {
      const registerFn = userType === "resident" ? registerResident : registerInspector;
      const response = await registerFn(userData);
      if (response.data.status === 200) {
        alert(response.data.message);
        return response;
      }
    } catch (error) {
      // 에러 응답 처리 수정
      if (error.response?.data) {
        const validationErrors = error.response.data;
        // 유효성 검증 에러 메시지 표시
        Object.keys(validationErrors).forEach((key) => {
          alert(`${key}: ${validationErrors[key]}`);
        });
      } else {
        alert("회원가입에 실패했습니다.");
      }
      throw error;
    }
  };

  // 타이머 설정
  useEffect(() => {
    if (codeRequestTime) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - codeRequestTime >= 180000) {
          // 3분(180초) 경과
          setIsCodeExpired(true);
          clearInterval(timer); // 타이머 정리
        }
      }, 1000); // 1초마다 체크

      return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [codeRequestTime]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <AuthForm
          // 로그인 props
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleLogin}
          error={error}
          isLoading={isLoading}
          // 회원가입 props
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          userName={userName}
          setUserName={setUserName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          companyName={companyName}
          setCompanyName={setCompanyName}
          employeeNumber={employeeNumber}
          setEmployeeNumber={setEmployeeNumber}
          showEmailVerification={showEmailVerification}
          setShowEmailVerification={setShowEmailVerification}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleEmailVerification={handleEmailVerification}
          handleVerifyCode={handleVerifyCode}
          handleRegister={handleRegister}
          isEmailVerified={isEmailVerified}
          verificationError={verificationError}
          isCodeExpired={isCodeExpired} // 만료 상태 전달
        />
      </div>
    </div>
  );
}

export default Auth;
