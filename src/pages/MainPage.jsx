import React, { useEffect, useState } from "react";
import "./MainPage.css";

const MainPage = () => {
  const [text, setText] = useState("");
  const fullText = "당신의 안전한 주택, 안주";

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

  const getTextColor = (word) => {
    return word === "안주" ? "rgb(1, 148, 70)" : "#c8c8c8";
  };

  return (
    <div className="main-container">
      <div className="typing-text">
        {text.split(" ").map((word, index) => (
          <span key={index} style={{ color: getTextColor(word) }}>
            {word}{index < text.split(" ").length - 1 ? " " : ""}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
