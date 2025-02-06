// src/pages/Test.jsx
import React from 'react';
import ParticleBackground from '../../components/particle/ParticleBackground';
import './Test.css';
import MiniCalendar from '../../components/common/Calendar/MiniCalendar';
import Sidebar from '../../components/Sidebar/Sidebar';

const Test = () => {
  return (
    <div className="test-container">
      <div className="content">
        <Sidebar />
      </div>
    </div>
  );
};

export default Test;
