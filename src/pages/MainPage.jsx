import React, { useEffect, useState } from "react";
import { Card, Carousel } from "../components/common/Carousel/Carousel";
import { createDefect } from "../api/apiClient"; // API import 추가
import "./MainPage.css";

const MainPage = () => {
  const [text, setText] = useState("");
  const [showCarouselText, setShowCarouselText] = useState(false);
  const [moveUp, setMoveUp] = useState(false);
  const [results, setResults] = useState({}); // 이미지별 결과 저장
  const [loadingStates, setLoadingStates] = useState({}); // 로딩 상태 관리

  const fullText = "당신의 안전한 주택, 안주";
  const defectImages = [
    {
      url: require("../assets/images/model/CoatingDamage.jpg"),
      title: "도장 손상",
    },
    {
      url: require("../assets/images/model/ConcreteCracks.jpg"),
      title: "콘크리트 균열",
    },
    {
      url: require("../assets/images/model/Efflorescence_WaterLeakage.jpg"),
      title: "백태 및 누수",
    },
    {
      url: require("../assets/images/model/ExposedReinforcement.jpg"),
      title: "철근 노출",
    },
    { url: require("../assets/images/model/Spalling.jpg"), title: "박리" },
    {
      url: require("../assets/images/model/SteelDamage.jpg"),
      title: "강재 손상",
    },
  ];

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText((prev) => fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // 타이핑 효과 완료 후 1.5초 뒤에 애니메이션 시작
        setTimeout(() => {
          setMoveUp(true);
          setTimeout(() => {
            setShowCarouselText(true);
          }, 1000);
        }, 1500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const getTextColor = (word) => {
    return word === "안주" ? "rgb(1, 65, 31)" : "rgb(168, 176, 168)";
  };

  const handleImageTest = async (image, index) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [index]: true }));

      const fetchResponse = await fetch(image.url);
      const blob = await fetchResponse.blob();
      const file = new File([blob], `${image.title}.jpg`, { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const apiResponse = await createDefect(formData);
      const resultData = apiResponse.data.data;

      setResults((prev) => ({
        ...prev,
        [index]: {
          defectType: resultData[0]?.label || "미확인",
          confidence: Math.round((resultData[0]?.confidence || 0) * 100),
          model: resultData[0]?.model,
        },
      }));
    } catch (error) {
      console.error(`이미지 ${index} 처리 실패:`, error);
      setResults((prev) => ({
        ...prev,
        [index]: { error: "결함 검출 실패" },
      }));
    } finally {
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="main-container">
      <div className={`typing-text-section ${moveUp ? "move-up" : ""}`}>
        <div className="typing-text">
          {text.split(" ").map((word, index) => (
            <span key={index} style={{ color: getTextColor(word) }}>
              {word}
              {index < text.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      </div>
      <div className={`carousel-section ${moveUp ? "show" : ""}`}>
        <div
          className={`carousel-intro-text ${showCarouselText ? "show" : ""}`}
        >
          안전한 주거 공간의 시작, AI 결함 진단을 체험해보세요!
        </div>
        <div className={`carousel-container ${showCarouselText ? "show" : ""}`}>
          <Carousel>
            {defectImages.map((image, index) => (
              <Card
                key={index}
                index={index}
                imageUrl={image.url}
                title={image.title}
                result={results[index]}
                isLoading={loadingStates[index]}
                onTest={() => handleImageTest(image, index)}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
