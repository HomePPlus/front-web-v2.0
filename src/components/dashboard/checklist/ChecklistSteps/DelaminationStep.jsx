import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const Delaminationstep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">4. 박리</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="손상 범위"
          fieldName="damage-range" // 영어 클래스 식별자
          name="delaminationRange"
          options={['소규모', '중규모', '대규모']}
          value={formData.delamination.delaminationRange}
          onChange={(value) => handleInputChange('delamination', 'delaminationRange', value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>박리 원인:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.delamination.delaminationCause}
          onChange={(e) => handleInputChange('delamination', 'delaminationCause', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>안정성 영향:</label>
        <input
          type="text"
          className="checklist-input"
          value={formData.delamination.stabilityImpact}
          onChange={(e) => handleInputChange('delamination', 'stabilityImpact', e.target.value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>응급처치 필요 여부:</label>
        <div className="checklist-radio-group">
          {['필요', '불필요'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="delamination_emergency"
                value={type}
                checked={formData.delamination.emergency === type}
                onChange={(e) => handleInputChange('delamination', 'emergency', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="checklist-input-group">
        <label>수리 계획:</label>
        <div className="checklist-radio-group">
          {['재도장', '보강 작업'].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="delamination_repair_plan"
                value={type}
                checked={formData.delamination.repairPlan === type}
                onChange={(e) => handleInputChange('delamination', 'repairPlan', e.target.value)}
              />
              {type}
            </label>
          ))}
          <label>
            <input
              type="radio"
              name="delamination_repair_plan"
              value="기타"
              checked={formData.delamination.repairPlan === '기타'}
              onChange={(e) => handleInputChange('delamination', 'repairPlan', e.target.value)}
            />
            기타 (구체적으로 작성):
            <input
              type="text"
              className="checklist-input"
              value={formData.delamination.repairPlanDetail || ''}
              onChange={(e) => handleInputChange('delamination', 'repairPlanDetail', e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  </section>
);
export default Delaminationstep;
/*
        <section className="checklist-section">
          <h2 className="checklist-section-title">4. 박리</h2>
          <div className="checklist-grid">
            <div className="checklist-input-group">
              <RadioGroup
                title="손상 범위"
                fieldName="damage-range" // 영어 클래스 식별자
                name="delaminationRange"
                options={['소규모', '중규모', '대규모']}
                value={formData.delamination.delaminationRange}
                onChange={(value) => handleInputChange('delamination', 'delaminationRange', value)}
              />
            </div>
            <div className="checklist-input-group">
              <label>박리 원인:</label>
              <input
                type="text"
                className="checklist-input"
                value={formData.delamination.delaminationCause}
                onChange={(e) => handleInputChange('delamination', 'delaminationCause', e.target.value)}
              />
            </div>
            <div className="checklist-input-group">
              <label>안정성 영향:</label>
              <input
                type="text"
                className="checklist-input"
                value={formData.delamination.stabilityImpact}
                onChange={(e) => handleInputChange('delamination', 'stabilityImpact', e.target.value)}
              />
            </div>
            <div className="checklist-input-group">
              <label>응급처치 필요 여부:</label>
              <div className="checklist-radio-group">
                {['필요', '불필요'].map((type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="delamination_emergency"
                      value={type}
                      checked={formData.delamination.emergency === type}
                      onChange={(e) => handleInputChange('delamination', 'emergency', e.target.value)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className="checklist-input-group">
              <label>수리 계획:</label>
              <div className="checklist-radio-group">
                {['재도장', '보강 작업'].map((type) => (
                  <label key={type}>
                    <input
                      type="radio"
                      name="delamination_repair_plan"
                      value={type}
                      checked={formData.delamination.repairPlan === type}
                      onChange={(e) => handleInputChange('delamination', 'repairPlan', e.target.value)}
                    />
                    {type}
                  </label>
                ))}
                <label>
                  <input
                    type="radio"
                    name="delamination_repair_plan"
                    value="기타"
                    checked={formData.delamination.repairPlan === '기타'}
                    onChange={(e) => handleInputChange('delamination', 'repairPlan', e.target.value)}
                  />
                  기타 (구체적으로 작성):
                  <input
                    type="text"
                    className="checklist-input"
                    value={formData.delamination.repairPlanDetail || ''}
                    onChange={(e) => handleInputChange('delamination', 'repairPlanDetail', e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
        </section>
        */
