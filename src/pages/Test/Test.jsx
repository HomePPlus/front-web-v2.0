// src/pages/Test.jsx
import React from 'react';
import ParticleBackground from '../../components/particle/ParticleBackground';
import "./Test.css"
import MovingMascot from '../../components/common/Mascot/MovingMascot';

const TestPage = () => {
  return (
    <div className="test-container">
      <div className="content">
        <MovingMascot></MovingMascot>
        <h1>3D Particle Background Test</h1>
        {/* 여기에 다른 컴포넌트들 추가 */}
      </div>
      
    </div>
    
  );
};

export default TestPage;
