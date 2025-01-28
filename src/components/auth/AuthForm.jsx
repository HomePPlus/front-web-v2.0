import React, { useState } from 'react';
import './AuthForm.css';
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-main">
      {/* 로그인 폼 */}
      <div className={`auth-container auth-b-container ${!isLogin ? 'auth-is-txl' : ''}`}>
        <form className="auth-form">
          <h2 className="auth-form-title">Sign in</h2>
          <input type="email" placeholder="Email" className="auth-form-input" />
          <input type="password" placeholder="Password" className="auth-form-input" />
          <button type="submit" className="auth-submit-button">SIGN IN</button>
        </form>
      </div>

      {/* 회원가입 폼 */}
      <div className={`auth-container auth-a-container ${!isLogin ? 'auth-is-txl auth-is-z200' : ''}`}>
        <form className="auth-form">
          <h2 className="auth-form-title">Create Account</h2>
          <input type="text" placeholder="Name" className="auth-form-input" />
          <input type="email" placeholder="Email" className="auth-form-input" />
          <input type="password" placeholder="Password" className="auth-form-input" />
          <button type="submit" className="auth-submit-button">SIGN UP</button>
        </form>
      </div>

      {/* 전환 버튼 영역 */}
      <div className={`auth-switch ${!isLogin ? 'auth-is-txr' : ''}`}>
        <div className={`auth-switch__circle ${!isLogin ? 'auth-is-txr' : ''}`}></div>
        <div className={`auth-switch__circle auth-switch__circle--t ${!isLogin ? 'auth-is-txr' : ''}`}></div>
        <div className={`auth-switch__container ${!isLogin ? 'auth-is-hidden' : ''}`}>
          <h2 className="auth-switch__title">Welcome Back!</h2>
          <p className="auth-switch__description">To keep connected with us please login with your personal info</p>
          <button className="auth-switch-button" onClick={switchForm}>SIGN UP</button>
        </div>
        <div className={`auth-switch__container ${!isLogin ? '' : 'auth-is-hidden'}`}>
          <h2 className="auth-switch__title">Hello Friend!</h2>
          <p className="auth-switch__description">Enter your personal details and start journey with us</p>
          <button className="auth-switch-button" onClick={switchForm}>SIGN IN</button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
