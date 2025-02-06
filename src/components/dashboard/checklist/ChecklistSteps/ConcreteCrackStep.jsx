import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const ConcreteCrackStep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">1. 콘크리트 균열</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="균열의 형태"
          fieldName="crack-shape"
          name="concrete_crack_type"
          options={['수평', '수직', '경사', '대각선']}
          value={formData.concreteCrack.type}
          onChange={(value) => handleInputChange('concreteCrack', 'type', value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>균열의 길이 (cm)</label>
        <input
          type="number"
          className="checklist-input"
          value={formData.concreteCrack.length}
          onChange={(e) => handleInputChange('concreteCrack', 'length', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>균열의 폭 (mm)</label>
        <input
          type="number"
          className="checklist-input"
          value={formData.concreteCrack.width}
          onChange={(e) => handleInputChange('concreteCrack', 'width', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>균열의 깊이 (mm)</label>
        <input
          type="number"
          className="checklist-input"
          value={formData.concreteCrack.depth}
          onChange={(e) => handleInputChange('concreteCrack', 'depth', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>누수 여부:</label>
        <div className="checklist-radio-group">
          {['예', '아니오'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="concrete_crack_leakage"
                value={type}
                checked={formData.concreteCrack.leakage === type}
                onChange={(e) => handleInputChange('concreteCrack', 'leakage', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>균열의 이동성:</label>
        <div className="checklist-radio-group">
          {['이동 중', '고정됨'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="concrete_crack_movement"
                value={type}
                checked={formData.concreteCrack.movement === type}
                onChange={(e) => handleInputChange('concreteCrack', 'movement', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>균열의 변화 여부:</label>
        <div className="checklist-radio-group">
          {['확대 됨', '변화 없음'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="concrete_crack_change"
                value={type}
                checked={formData.concreteCrack.change === type}
                onChange={(e) => handleInputChange('concreteCrack', 'change', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <div className="checklist-input-group">
          <RadioGroup
            title="건전성 평가"
            fieldName="condition-assessment"
            name="concrete_crack_condition"
            options={['위험 있음', '위험 없음']}
            value={formData.concreteCrack.condition}
            onChange={(value) => handleInputChange('concreteCrack', 'condition', value)}
          />
        </div>
      </div>
      <div className="checklist-input-group">
        <label>응급처치 필요 여부:</label>
        <div className="checklist-radio-group">
          {['필요', '불필요'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="concrete_crack_emergency"
                value={type}
                checked={formData.concreteCrack.emergency === type}
                onChange={(e) => handleInputChange('concreteCrack', 'emergency', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>수리 계획:</label>
        <div className="checklist-radio-group">
          {['주입식 수리', '보강 작업'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="concrete_crack_repair_plan"
                value={type}
                checked={formData.concreteCrack.repairPlan === type}
                onChange={(e) => handleInputChange('concreteCrack', 'repairPlan', e.target.value)}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="concrete_crack_repair_plan"
              value="기타"
              checked={formData.concreteCrack.repairPlan === '기타'}
              onChange={(e) => handleInputChange('concreteCrack', 'repairPlan', e.target.value)}
            />
            기타 (구체적으로 작성):
            <input
              type="text"
              className="checklist-input"
              value={formData.concreteCrack.repairPlanDetail || ''}
              onChange={(e) => handleInputChange('concreteCrack', 'repairPlanDetail', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  </section>
);
export default ConcreteCrackStep;
