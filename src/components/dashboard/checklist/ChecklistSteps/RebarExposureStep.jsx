import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';

const RebarExposureStep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">5. 철근 노출</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="손상 범위"
          fieldName="exposureRange" // 영어 클래스 식별자
          name=""
          options={['소규모', '중규모', '대규모']}
          value={formData.rebarExposure.exposureRange}
          onChange={(value) => handleInputChange('rebarExposure', 'exposureRange', value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>노출 상태:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.rebarExposure.exposureCondition}
          onChange={(e) => handleInputChange('rebarExposure', 'exposureCondition', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>노출 원인:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.rebarExposure.exposureCause}
          onChange={(e) => handleInputChange('rebarExposure', 'exposureCause', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>안정성 영향:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.rebarExposure.stabilityImpact}
          onChange={(e) => handleInputChange('rebarExposure', 'stabilityImpact', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>응급처치 필요 여부:</label>
        <div className="checklist-radio-group">
          {['필요', '불필요'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="rebarExposure_emergency"
                value={type}
                checked={formData.rebarExposure.emergency === type}
                onChange={(e) => handleInputChange('rebarExposure', 'emergency', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>수리 계획:</label>
        <div className="checklist-radio-group">
          {['부식 방지 처리', '덧씌우기'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="rebarExposure_repair_plan"
                value={type}
                checked={formData.rebarExposure.repairPlan === type}
                onChange={(e) => handleInputChange('rebarExposure', 'repairPlan', e.target.value)}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="rebarExposure_repair_plan"
              value="기타"
              checked={formData.rebarExposure.repairPlan === '기타'}
              onChange={(e) => handleInputChange('rebarExposure', 'repairPlan', e.target.value)}
            />
            기타 (구체적으로 작성):
            <input
              type="text"
              className="checklist-input"
              value={formData.rebarExposure.repairPlanDetail || ''}
              onChange={(e) => handleInputChange('rebarExposure', 'repairPlanDetail', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  </section>
);
export default RebarExposureStep;
