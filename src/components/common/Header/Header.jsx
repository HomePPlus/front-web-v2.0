import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({ navLinks }) => {
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
