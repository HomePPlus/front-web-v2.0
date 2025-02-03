// src/pages/Test.jsx
import React from 'react';
import ParticleBackground from '../../components/particle/ParticleBackground';
import "./Test.css"
import MiniCalendar from '../../components/common/Calendar/MiniCalendar';

const TestPage = () => {
  return (
    <div className="test-container">
      <div className="content">
        <MiniCalendar></MiniCalendar>
      </div>
      
    </div>
    
  );
};

export default TestPage;
