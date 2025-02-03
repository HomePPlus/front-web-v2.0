import React, { useEffect } from "react";
import "./AppCardComponent.css";

const AppCardComponent = ({ title, subtitle, imageUrl }) => {
  useEffect(() => {
    const card = document.querySelector(".app-card");

    const handleMouseMove = (event) => {
      const x = -((window.innerWidth / 2 - event.pageX) / 30);
      const y = (window.innerHeight / 2 - event.pageY) / 10;
      card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
