import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const BasicInfoStep = ({ formData, handleInputChange, handleCheckboxChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">1. 기본 정보</h2>
    <div className="basic-info-grid">
      <div className="basic-info-left">
        <div className="checklist-input-group">
          <label>점검 번호:</label>
          <input 
            type="text" 
            name="inspection_id" 
            value={formData.basicInfo.inspectionId} 
            onChange={(e) => handleInputChange('basicInfo', 'inspectionId', e.target.value)} 
            required 
          />
        </div>
        <div className="checklist-input-group">
          <label>점검 일자:</label>
          <input 
            type="date" 
            name="inspection_date" 
            value={formData.basicInfo.inspectionDate} 
            onChange={(e) => handleInputChange('basicInfo', 'inspectionDate', e.target.value)} 
            required 
          />
        </div>
        <div className="checklist-input-group">
          <label>점검자 이름:</label>
          <input 
            type="text" 
            name="inspector_name" 
            value={formData.basicInfo.inspectorName} 
            onChange={(e) => handleInputChange('basicInfo', 'inspectorName', e.target.value)} 
            required 
          />
        </div>
        <div className="checklist-input-group">
          <label>점검자 연락처:</label>
          <input 
            type="text" 
            name="inspector_contact" 
            value={formData.basicInfo.inspectorContact} 
            onChange={(e) => handleInputChange('basicInfo', 'inspectorContact', e.target.value)} 
            required 
          />
        </div>
        <div className="checklist-input-group">
          <label>주소:</label>
          <input 
            type="text" 
            name="address" 
            value={formData.basicInfo.address} 
            onChange={(e) => handleInputChange('basicInfo', 'address', e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="basic-info-right">
        <div className="defect-selection">
          <h3 className="defect-selection-title">결함:</h3>
          <div className="defect-options">
            {[
              '콘크리트 균열',
              '누수/백태',
              '강재 손상',
              '박리',
              '철근 노출',
              '도장 손상'
            ].map((type) => (
              <label key={type} className="checkbox-option">
                <input
                  type="checkbox"
                  name="defect_type[]"
                  value={type}
                  checked={formData.basicInfo.defectTypes.includes(type)}
                  onChange={(e) => handleCheckboxChange('basicInfo', 'defectTypes', type, e.target.checked)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default BasicInfoStep;
