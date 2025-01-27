import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = () => {
  const navLinks = ['신고하기', '커뮤니티', '로그인&회원가입', '인스타그램']
    .map(label => ({url: '#', label}));

  return (
    <header className="header">
      <Logo />
      <div className="nav-wrapper">
        <Navigation links={navLinks} />
      </div>
    </header>
  );
};

export default Header;
