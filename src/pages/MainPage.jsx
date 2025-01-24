import React, { useEffect, useState } from "react";
import "./MainPage.css";

const MainPage = () => {
  const [text, setText] = useState("");
  const fullText = "당신의 안전한 주택, 안주"; // 표시할 전체 텍스트

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
      <div className="typing-text">{text}</div>
    </div>
  );
};

export default MainPage;
