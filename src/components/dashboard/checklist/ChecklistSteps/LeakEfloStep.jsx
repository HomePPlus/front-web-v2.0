import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';

const LeakEfloStep = ({ formData, handleInputChange, inspectionId }) => (
  <section className="checklist-section" data-step="leak">
    <div className="checklist-header">
      <div className="checklist-header-content">
        <h2 className="checklist-section-title">2. 균열 항목 체크리스트</h2>
        <h3 className="checklist-subtitle">[2] 누수/백태</h3>
      </div>
      <div className="inspection-id-display">
        점검 ID: {inspectionId}
      </div>
    </div>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="손상 범위"
          name="leak_eflo_range"
          options={['소규모', '중규모', '대규모']}
          value={formData.leakEflo.damageRange}
          onChange={(value) => handleInputChange('leakEflo', 'damageRange', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="누수/백태의 원인"
          name="leak_eflo_cause"
          options={[
            '시공 불량',
            '재료적 문제',
            '환경적 요인',
            '구조적 요인'
          ]}
          value={formData.leakEflo.cause}
          onChange={(value) => handleInputChange('leakEflo', 'cause', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="응급처치 필요 여부"
          name="leak_eflo_emergency"
          options={['필요', '불필요']}
          value={formData.leakEflo.emergency}
          onChange={(value) => handleInputChange('leakEflo', 'emergency', value)}
        />
        {formData.leakEflo.emergency === '필요' && (
          <div className="emergency-action-input">
            <label>응급 조치 사항:
              <input 
                type="text"
                name="leak_eflo_emergency_action"
                value={formData.leakEflo.emergencyAction}
                onChange={(e) => handleInputChange('leakEflo', 'emergencyAction', e.target.value)}
              />
            </label>
          </div>
        )}
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="수리 계획"
          name="leak_eflo_repair_plan"
          options={[
            '표면 처리',
            '방수 처리',
            '균열 보수',
            '구조 보강'
          ]}
          value={formData.leakEflo.repairPlan}
          onChange={(value) => handleInputChange('leakEflo', 'repairPlan', value)}
        />
      </div>
    </div>
  </section>
);

export default LeakEfloStep;
