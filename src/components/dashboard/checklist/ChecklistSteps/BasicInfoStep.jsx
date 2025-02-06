import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const BasicInfoStep = ({ formData, handleInputChange, handleCheckboxChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">기본 정보</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <label>점검 번호</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.basicInfo.inspectionId}
          onChange={(e) => handleInputChange('basicInfo', 'inspectionId', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>점검 일자</label>
        <input
          type="date"
          className="checklist-input"
          value={formData.basicInfo.inspectionDate}
          onChange={(e) => handleInputChange('basicInfo', 'inspectionDate', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>점검자 이름</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.basicInfo.inspectorName}
          onChange={(e) => handleInputChange('basicInfo', 'inspectorName', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>점검자 연락처</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.basicInfo.inspectorContact}
          onChange={(e) => handleInputChange('basicInfo', 'inspectorContact', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>주소</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.basicInfo.address}
          onChange={(e) => handleInputChange('basicInfo', 'address', e.target.value)}
        />
      </div>
    </div>
    <div className="checklist-checkbox-group">
      <h3 className="checklist-subtitle">균열 유형 선택</h3>
      <div className="checklist-checkbox-grid">
        {['콘크리트 균열', '누수/백태', '강재 손상', '박리', '철근 노출', '도장 손상'].map((type) => (
          <label key={type} className="checklist-checkbox-label">
            <input
              type="checkbox"
              className="checklist-checkbox"
              checked={formData.basicInfo.crackTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
            />
            <span className="checklist-custom-checkbox"></span>
            {type}
          </label>
        ))}
      </div>
    </div>
  </section>
);
export default BasicInfoStep;
