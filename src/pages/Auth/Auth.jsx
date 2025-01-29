import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { 
  login, 
  registerResident, 
  registerInspector, 
  sendVerificationCode, 
  verifyEmail, 
  checkEmail 
} from "../../api/apiClient";
import "./Auth.css";

function Auth() {
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

  // 로그인 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      if (response.data.status === 200) {
        alert(response.data.message); // 백엔드 메시지 사용
        console.log("Login successful:", response.data);
      } else {
        setError(response.data.message); // 백엔드 메시지 사용
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
        const response = await sendVerificationCode(email);
        if (response.data.status === 200) {
          alert(response.data.message);
          setShowEmailVerification(true);
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
      const errorMessage = error.response?.data?.message 
        || "인증 처리 실패";
      setVerificationError(errorMessage);
      alert("오류: " + errorMessage);
    }
  };


  // 회원가입 핸들러
  const handleRegister = async (userType, userData) => {
    try {
      const registerFn = userType === 'resident' ? registerResident : registerInspector;
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
        Object.keys(validationErrors).forEach(key => {
          alert(`${key}: ${validationErrors[key]}`);
        });
      } else {
        alert("회원가입에 실패했습니다.");
      }
      throw error;
    }
  };
  
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
        />
      </div>
    </div>
  );
}

export default Auth;
