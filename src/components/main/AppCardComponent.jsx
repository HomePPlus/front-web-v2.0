import React, { useEffect, useState } from "react";
import "./AppCardComponent.css";

const AppCardComponent = ({ title, subtitle, imageUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = document.querySelector(".app-card");
    
    setTimeout(() => {
      setIsVisible(true);
      card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }, 100);

    const handleMouseMove = (event) => {
      if (!isVisible) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // 마우스와 카드 중심점 사이의 거리를 기반으로 회전 각도 계산
      const rotateX = ((event.clientY - centerY) / (window.innerHeight / 2)) * 50; // 상하 회전 각도 줄임
      const rotateY = ((event.clientX - centerX) / (window.innerWidth / 2)) * 50; // 좌우 회전 각도 줄임
      
      // 부드러운 움직임을 위한 보간
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    // 마우스가 떠났을 때 원래 위치로 부드럽게 복귀
    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    document.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div className="app-card-perspective">
      <div className="app-card">
        <div
          className="app-card-thumb"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <h2 className="app-card-title">{title}</h2>
        <span className="app-card-subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

export default AppCardComponent;
