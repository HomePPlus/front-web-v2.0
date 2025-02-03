import React, { useEffect } from "react";
import "./CardComponent.css"; // 스타일 import

const CardComponent = ({ title, subtitle, imageUrl }) => {
  useEffect(() => {
    const card = document.querySelector(".card");

    const handleMouseMove = (event) => {
      const x = -((window.innerWidth / 2 - event.pageX) / 30);
      const y = (window.innerHeight / 2 - event.pageY) / 10;
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    // document에 mousemove 이벤트 리스너 추가
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="card-perspective">
      <div className="card">
        <div
          className="card-thumb"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <h2 className="card-title">{title}</h2>
        <span className="card-subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

export default CardComponent;
