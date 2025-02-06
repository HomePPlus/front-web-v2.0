import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const PaintDamageStep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">6. 도장 손상</h2>
    <div className="checklist-grid">
      <RadioGroup
        title="손상 범위"
        fieldName="damage-range" // 영어 클래스 식별자
        name="paintDamageRange"
        options={['소규모', '중규모', '대규모']}
        value={formData.paintDamage.damageRange}
        onChange={(value) => handleInputChange('paintDamage', 'damageRange', value)}
      />
      <div className="checklist-input-group">
        <label>손상 상태:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.paintDamage.damageCondition}
          onChange={(e) => handleInputChange('paintDamage', 'damageCondition', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>손상 원인:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.paintDamage.damageCause}
          onChange={(e) => handleInputChange('paintDamage', 'damageCause', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>응급처치 필요 여부:</label>
        <div className="checklist-radio-group">
          {['필요', '불필요'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="paintDamage_emergency"
                value={type}
                checked={formData.paintDamage.emergency === type}
                onChange={(e) => handleInputChange('paintDamage', 'emergency', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>수리 계획:</label>
        <div className="checklist-radio-group">
          {['재도장'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="paintDamage_repair_plan"
                value={type}
                checked={formData.paintDamage.repairPlan === type}
                onChange={(e) => handleInputChange('paintDamage', 'repairPlan', e.target.value)}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="paintDamage_repair_plan"
              value="기타"
              checked={formData.paintDamage.repairPlan === '기타'}
              onChange={(e) => handleInputChange('paintDamage', 'repairPlan', e.target.value)}
            />
            기타 (구체적으로 작성):
            <input
              type="text"
              className="checklist-input"
              value={formData.paintDamage.repairPlanDetail || ''}
              onChange={(e) => handleInputChange('paintDamage', 'repairPlanDetail', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  </section>
);
export default PaintDamageStep;
