import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';

const SteelDamageStep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">3. 강재 손상</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="손상 범위"
          fieldName="damage-range" // 영어 클래스 식별자
          name="steelDamageRange"
          options={['소규모', '중규모', '대규모']}
          value={formData.steelDamage.damageRange}
          onChange={(value) => handleInputChange('steelDamage', 'damageRange', value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>손상 심각도:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.steelDamage.damageSeverity}
          onChange={(e) => handleInputChange('steelDamage', 'damageSeverity', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>손상 원인:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.steelDamage.damageCause}
          onChange={(e) => handleInputChange('steelDamage', 'damageCause', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>안정성 영향:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.steelDamage.stabilityImpact}
          onChange={(e) => handleInputChange('steelDamage', 'stabilityImpact', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>응급처치 필요 여부:</label>
        <div className="checklist-radio-group">
          {['필요', '불필요'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="steelDamage_emergency"
                value={type}
                checked={formData.steelDamage.emergency === type}
                onChange={(e) => handleInputChange('steelDamage', 'emergency', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>수리 계획:</label>
        <div className="checklist-radio-group">
          {['강재 교체', '보강 작업'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="steelDamage_repair_plan"
                value={type}
                checked={formData.steelDamage.repairPlan === type}
                onChange={(e) => handleInputChange('steelDamage', 'repairPlan', e.target.value)}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="steelDamage_repair_plan"
              value="기타"
              checked={formData.steelDamage.repairPlan === '기타'}
              onChange={(e) => handleInputChange('steelDamage', 'repairPlan', e.target.value)}
            />
            기타 (구체적으로 작성):
            <input
              type="text"
              className="checklist-input"
              value={formData.steelDamage.repairPlanDetail || ''}
              onChange={(e) => handleInputChange('steelDamage', 'repairPlanDetail', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  </section>
);
export default SteelDamageStep;
