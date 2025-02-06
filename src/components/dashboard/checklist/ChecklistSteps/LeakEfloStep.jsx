import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const LeakEfloStep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">2. 누수/백태</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="손상 범위"
          fieldName="damage-range" // 영어 클래스 식별자
          name="leakageRange"
          options={['소규모', '중규모', '대규모']}
          value={formData.leakEflo.leakageRange}
          onChange={(value) => handleInputChange('leakEflo', 'leakageRange', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="누수 원인"
          fieldName="crack-cause" // CSS 클래스 식별자 (필요에 따라 수정)
          name="leakageCause"
          options={['기온변화', '습도변화']}
          value={formData.leakEflo.leakageCause}
          onChange={(value) => handleInputChange('leakEflo', 'leakageCause', value)}
        />
        <label>
          <input
            type="radio"
            name="concrete_crack_repair_plan"
            value="기타"
            checked={formData.leakEflo.repairPlan === '기타'}
            onChange={(e) => handleInputChange('leakEflo', 'repairPlan', e.target.value)}
          />
          기타 (구체적으로 작성):
          <input
            type="text"
            className="checklist-input"
            checked={formData.leakEflo.repairPlan === '기타'}
            onChange={(e) => handleInputChange('leakEflo', 'repairPlan', e.target.value)}
          />
        </label>
      </div>
      <div className="checklist-input-group">
        <label>백태 발생 여부:</label>
        <div className="checklist-radio-group">
          {['예', '아니오'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="leakEflo_eflorescence"
                value={type}
                checked={formData.leakEflo.eflorescence === type}
                onChange={(e) => handleInputChange('leakEflo', 'eflorescence', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="누수 및 백태의 영향"
          fieldName="crack-impact" // CSS 클래스 식별자 (필요에 따라 수정)
          name="leakImpact"
          options={['구조적 손상 없음', '구조적 손상 가능']}
          value={formData.leakEflo.leakImpact}
          onChange={(value) => handleInputChange('leakEflo', 'leakImpact', value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>응급처치 필요 여부:</label>
        <div className="checklist-radio-group">
          {['필요', '불필요'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="leakEflo_emergency"
                value={type}
                checked={formData.leakEflo.emergency === type}
                onChange={(e) => handleInputChange('leakEflo', 'emergency', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>수리 계획:</label>
        <div className="checklist-radio-group">
          {['방수 처리', '배수 시스템 점검'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="leakEflo_repair_plan"
                value={type}
                checked={formData.leakEflo.repairPlan === type}
                onChange={(e) => handleInputChange('leakEflo', 'repairPlan', e.target.value)}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="leakEflo_repair_plan"
              value="기타"
              checked={formData.leakEflo.repairPlan === '기타'}
              onChange={(e) => handleInputChange('leakEflo', 'repairPlan', e.target.value)}
            />
            기타 (구체적으로 작성):
            <input
              type="text"
              className="checklist-input"
              value={formData.leakEflo.repairPlanDetail || ''}
              onChange={(e) => handleInputChange('leakEflo', 'repairPlanDetail', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  </section>
);
export default LeakEfloStep;
