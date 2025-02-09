import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';

const SteelDamageStep = ({ formData, handleInputChange, inspectionId }) => (
  <section className="checklist-section" data-step="steel">
    <div className="checklist-header">
      <div className="checklist-header-content">
        <h2 className="checklist-section-title">2. 균열 항목 체크리스트</h2>
        <h3 className="checklist-subtitle">[3] 강재 부식</h3>
      </div>
      <div className="inspection-id-display">
        점검 ID: {inspectionId}
      </div>
    </div>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="부식 범위"
          name="steel_damage_range"
          options={['소규모', '중규모', '대규모']}
          value={formData.steelDamage.damageRange}
          onChange={(value) => handleInputChange('steelDamage', 'damageRange', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="부식의 원인"
          name="steel_damage_cause"
          options={[
            '시공 불량',
            '재료적 문제',
            '환경적 요인',
            '구조적 요인'
          ]}
          value={formData.steelDamage.cause}
          onChange={(value) => handleInputChange('steelDamage', 'cause', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="구조적 안전성"
          name="steel_damage_safety"
          options={['안전', '주의 필요', '위험']}
          value={formData.steelDamage.safety}
          onChange={(value) => handleInputChange('steelDamage', 'safety', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="응급처치 필요 여부"
          name="steel_damage_emergency"
          options={['필요', '불필요']}
          value={formData.steelDamage.emergency}
          onChange={(value) => handleInputChange('steelDamage', 'emergency', value)}
        />
        {formData.steelDamage.emergency === '필요' && (
          <div className="emergency-action-input">
            <label>응급 조치 사항:
              <input 
                type="text"
                name="steel_damage_emergency_action"
                value={formData.steelDamage.emergencyAction}
                onChange={(e) => handleInputChange('steelDamage', 'emergencyAction', e.target.value)}
              />
            </label>
          </div>
        )}
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="수리 계획"
          name="steel_damage_repair_plan"
          options={[
            '방청 처리',
            '강재 교체',
            '보강 작업',
            '표면 처리'
          ]}
          value={formData.steelDamage.repairPlan}
          onChange={(value) => handleInputChange('steelDamage', 'repairPlan', value)}
        />
      </div>
    </div>
  </section>
);

export default SteelDamageStep;
