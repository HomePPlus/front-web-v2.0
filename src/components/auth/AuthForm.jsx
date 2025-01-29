import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import './AuthForm.css';

function AuthForm({ 
  // 로그인 관련 props
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleSubmit, 
  error, 
  isLoading,
  // 회원가입 관련 props
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
  userName,
  setUserName,
  phoneNumber,
  setPhoneNumber,
  companyName,
  setCompanyName,
  employeeNumber,
  setEmployeeNumber,
  handleRegister,
  handleEmailVerification,
  verificationCode,
  setVerificationCode,
  showEmailVerification,
  handleVerifyCode,
  isEmailVerified,
  verificationError
}) {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('resident');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [address, setAddress] = useState({ roadAddress: '', detailAddress: '' });

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  // 다음 주소 검색 팝업
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleAddressSearch = () => {
    open({
      onComplete: (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddress !== '') {
            fullAddress += ` (${extraAddress})`;
          }
        }

        setAddress({
          ...address,
          roadAddress: fullAddress,
        });
      }
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
  
    const userData = {
      email: registerEmail,
      password: registerPassword,
      userName: userName,
      phone: phoneNumber,
      detailAddress: address.roadAddress + ' ' + address.detailAddress,
      ...(userType === 'inspector' && {
        inspector_company: companyName,
        inspector_number: employeeNumber
      })
    };
  
    try {
      await handleRegister(userType, userData);
      switchForm(); // 성공시 로그인 폼으로 전환
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="auth-main">
      {/* 로그인 폼 */}
      <div className={`auth-container auth-b-container ${!isLogin ? 'auth-is-txl' : ''}`}>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">로그인</h2>
          <input 
            type="email" 
            placeholder="Email" 
            className="auth-form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="auth-form-group">
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              className="auth-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🔓" : "🔒" } 
            </button>
          </div>
          {error && <p className="auth-error-message">{error}</p>}
          <button 
            type="submit" 
            className="auth-submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : '로그인'}
          </button>
        </form>
      </div>

      {/* 회원가입 폼 */}
      <div className={`auth-container auth-a-container ${!isLogin ? 'auth-is-txl auth-is-z200' : ''}`}>
        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <div className="auth-user-type">
            <button
              type="button"
              className={`auth-type-button ${userType === 'resident' ? 'active' : ''}`}
              onClick={() => setUserType('resident')}
            >
              입주민
            </button>
            <button
              type="button"
              className={`auth-type-button ${userType === 'inspector' ? 'active' : ''}`}
              onClick={() => setUserType('inspector')}
            >
              점검자
            </button>
          </div>

          <input 
            type="text" 
            placeholder="User Name" 
            className="auth-form-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          
          <div className="auth-form-group">
            <input 
              type="email" 
              placeholder="Email" 
              className="auth-form-input"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <button 
              type="button" 
              className="auth-verification-button"
              onClick={() => handleEmailVerification(registerEmail)}
              disabled={isEmailVerified}
            >
              {isEmailVerified ? '인증완료' : '인증코드 전송'}
            </button>
          </div>

          {showEmailVerification && (
            <div className="auth-form-group">
              <input 
                type="text" 
                placeholder="Verification Code" 
                className="auth-form-input"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button 
                type="button" 
                className="auth-verification-button"
                onClick={handleVerifyCode}
              >
                인증코드 확인
              </button>
            </div>
          )}
          {verificationError && <p className="auth-error-message">{verificationError}</p>}

          <div className="auth-form-group">
            <input 
              type={showRegisterPassword ? "text" : "password"}
              placeholder="Password" 
              className="auth-form-input"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button 
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
            >
              {showRegisterPassword ? "🔓" : "🔒" }
            </button>
          </div>
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="auth-form-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className="auth-form-group">
            <input 
              type="text" 
              placeholder="Road Address" 
              className="auth-form-input"
              value={address.roadAddress}
              readOnly 
            />
            <button 
              type="button" 
              className="auth-address-button"
              onClick={handleAddressSearch}
            >
              주소 검색
            </button>
          </div>

          {address.roadAddress && (
            <input 
              type="text" 
              placeholder="Detail Address" 
              className="auth-form-input"
              value={address.detailAddress}
              onChange={(e) => setAddress({...address, detailAddress: e.target.value})}
            />
          )}

          {userType === 'inspector' && (
            <>
              <input 
                type="text" 
                placeholder="Company Name" 
                className="auth-form-input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Employee Number" 
                className="auth-form-input"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
            </>
          )}

          <button type="submit" className="auth-submit-button">회원가입</button>
        </form>
      </div>

      {/* 전환 버튼 영역 */}
      <div className={`auth-switch ${!isLogin ? 'auth-is-txr' : ''}`}>
        <div className={`auth-switch__circle ${!isLogin ? 'auth-is-txr' : ''}`}></div>
        <div className={`auth-switch__circle auth-switch__circle--t ${!isLogin ? 'auth-is-txr' : ''}`}></div>
        <div className={`auth-switch__container ${!isLogin ? 'auth-is-hidden' : ''}`}>
          <h2 className="auth-switch__title">어서오세요!</h2>
          <p className="auth-switch__description">당신의 안전한 주택, 안주</p>
          <button className="auth-switch-button" onClick={switchForm}>회원가입</button>
        </div>
        <div className={`auth-switch__container ${!isLogin ? '' : 'auth-is-hidden'}`}>
          <h2 className="auth-switch__title">반가워요!</h2>
          <p className="auth-switch__description">안전한 주거공간의 시작, 지금 시작해보세요</p>
          <button className="auth-switch-button" onClick={switchForm}>로그인</button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
