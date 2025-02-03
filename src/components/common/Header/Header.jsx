import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { isAuthenticated } from "../../../utils/auth";
import { logout } from "../../../api/apiClient";
import "./Header.css";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setLoggedIn(isAuthenticated());
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedIn(false);
      console.log("Logged out, isAuthenticated:", isAuthenticated());
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const navLinks = [
    { url: "/report", label: "신고하기" },
    { url: "/community", label: "커뮤니티" },
    {
      url: loggedIn ? "#" : "/auth",
      label: loggedIn ? "로그아웃" : "로그인&회원가입",
      onClick: loggedIn ? handleLogout : null,
    },
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
