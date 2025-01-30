import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = () => {
  const navLinks = [
    { url: "#", label: "신고하기" },
    { url: "/community", label: "커뮤니티" },
    { url: "/login", label: "로그인&회원가입" },
    { url: "#", label: "인스타그램" },
  ];

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <Logo />
        </Link>
      </div>
      <div className="header-right">
        <Navigation links={navLinks} />
      </div>
    </header>
  );
};

export default Header;
