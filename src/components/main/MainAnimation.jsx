import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './MainAnimation.css';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(TextPlugin);

const MainAnimation = ({ onComplete }) => {
  const wrapRef = useRef(null);
  const text1Ref = useRef(null);
  const timeline = useRef();
  const { contextSafe } = useGSAP({ scope: wrapRef });

  const messages = [
    "안전한 주거환경을 만들어드립니다",
    "안주",
    "AI 결함 탐지 시스템",
    "실시간 건물 진단 서비스",
    "스마트한 관리 솔루션",
    "지금 바로 경험해보세요",
    "Safety Starts Here 🛡️"
  ];

  useGSAP(() => {
    timeline.current = gsap.timeline({
      onComplete: contextSafe(() => {
        gsap.to('.MainAnimation-replayButton', { 
          opacity: 1, 
          display: 'block',
          ease: "power2.out",
          duration: 0.3
        });
        onComplete();
      })
    });

    timeline.current
      .from(wrapRef.current, {
        duration: 0.7,
        scale: 0.8,
        opacity: 0,
        ease: "power3.out"
      })
      .to(text1Ref.current, {
        duration: 0.7,
        text: messages[0],
        opacity: 1,
        y: 0,
        ease: "power4.out"
      });
  

    // 메시지 순차적 표시
    messages.slice(1).forEach((msg, i) => {
      timeline.current
        .to(text1Ref.current, {
          duration: 0.7,  // 표시 시간 증가
          text: msg,
          ease: "power2.inOut"
        })
        .to(wrapRef.current, {
          duration: 0.6,
          scale: 1.1,
          yoyo: true,
          repeat: 1
        });
    });
  
    // 최종 로고 애니메이션
    timeline.current
      .to(text1Ref.current, { 
        opacity: 0, 
        duration: 1.2,
        ease: "power4.inOut" 
      });
  
    return () => timeline.current.kill();
  }, { dependencies: [onComplete, messages] });
  
  const handleReplay = () => {
    gsap.set('.MainAnimation-replayButton', { 
      opacity: 0, 
      display: 'none'
    });
    timeline.current.restart();
  };

  return (
    <div className="MainAnimation-container">
      <div className="MainAnimation-textWrap" ref={wrapRef}>
        <span className="MainAnimation-textMain" ref={text1Ref}></span>
      </div>
      <button className="MainAnimation-replayButton" onClick={handleReplay}>
        <svg viewBox="0 0 24 24" className="MainAnimation-replayIcon">
          <path fill="#ffffff" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
        </svg>
      </button>
    </div>
  );
};

export default MainAnimation;
