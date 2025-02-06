import { React, useState } from 'react';
import '../ChecklistForm.css';
import RadioGroup from '../RadioGroup';
const OverallAssessmentStep = ({ formData, handleInputChange }) => (
  <section className="checklist-section">
    <h2 className="checklist-section-title">종합 평가</h2>
    <div className="checklist-grid">
      <div className="checklist-input-group">
        <RadioGroup
          title="전체 점검 결과"
          fieldName="overall-result"
          name="overallResult"
          options={['안전성에 문제 없음', '구조적 문제 발생 가능성 있음']}
          value={formData.overallAssessment.overallResult}
          onChange={(value) => handleInputChange('overallAssessment', 'overallResult', value)}
        />
      </div>
      <div className="checklist-input-group">
        <RadioGroup
          title="모니터링 필요 여부"
          fieldName="monitoring-required"
          name="monitoringRequired"
          options={['필요', '불필요']}
          value={formData.overallAssessment.monitoringRequired}
          onChange={(value) => handleInputChange('overallAssessment', 'monitoringRequired', value)}
        />
      </div>
      <div className="checklist-input-group">
        <label>다음 점검 일정:</label>
        <input
          type="date"
          className="checklist-input"
          value={formData.overallAssessment.nextInspectionDate}
          onChange={(e) => handleInputChange('overallAssessment', 'nextInspectionDate', e.target.value)}
        />
      </div>
    </div>
  </section>
);
export default OverallAssessmentStep;
