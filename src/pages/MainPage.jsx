import React, { useEffect, useState } from "react";
import AnimatedButton from '../components/common/AnimatedButton';
import NavigationBar from '../components/common/NavigationBar';
import { HomeIcon, SearchIcon, InstagramIcon, ProfileIcon } from '../assets/icons/index';
import "./MainPage.css";

const MainPage = () => {
  const [text, setText] = useState("");
  const fullText = "당신의 안전한 주택, 안주";

  const navItems = [
    { icon: <HomeIcon />, label: 'home' },
    { icon: <SearchIcon />, label: 'search' },
    { icon: <InstagramIcon />, label: 'instagram' },
    { icon: <ProfileIcon />, label: 'profile' },
    
  ];

  const handleNavClick = (index) => {
    console.log(`Clicked nav item ${index}`);
  };

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText((prev) => fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="main-container">
      <div className="nav-wrapper">
        <NavigationBar 
          items={navItems}
          activeColor="#F8C400"
          duration={0.3}
          onItemClick={handleNavClick}
        />
      </div>
      <div className="typing-text">{text}</div>
      <div className="button-container">
        <AnimatedButton text="시작하기" />
        <AnimatedButton 
          text="서비스 소개" 
          variant="white" 
        />
        <AnimatedButton 
          text="문의하기" 
          variant="transparent" 
        />
      </div>
    </div>
  );
};

export default MainPage;
