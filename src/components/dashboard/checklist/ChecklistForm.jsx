import { React, useState } from 'react';
import './ChecklistForm.css';
import RadioGroup from './RadioGroup';
import BasicInfoStep from './ChecklistSteps/BasicInfoStep';
import ConcreteCrackStep from './ChecklistSteps/ConcreteCrackStep';
import LeakEfloStep from './ChecklistSteps/LeakEfloStep';
import SteelDamageStep from './ChecklistSteps/SteelDamageStep';
import DelaminationStep from './ChecklistSteps/DelaminationStep';
import RebarExposureStep from './ChecklistSteps/RebarExposureStep';
import PaintDamageStep from './ChecklistSteps/PaintDamageStep';
import OverallAssessmentStep from './ChecklistSteps/OverallAssessmentStep';

const initialFormData = {
  basicInfo: {
    inspectionId: '',
    inspectionDate: '',
    inspectorName: '',
    inspectorContact: '',
    address: '',
    defectTypes: [],
  },
  concreteCrack: {
    type: '',
    length: '',
    width: '',
    depth: '',
    leakage: '',
    movement: '',
    change: '',
    condition: '',
    emergency: '',
    repairPlan: '',
    repairPlanDetail: '',
    emergencyAction: '',
  },
  leakEflo: {
    leakageRange: '',
    leakageCause: '',
    eflorescence: '',
    leakImpact: '',
    emergency: '',
    repairPlan: '',
    emergencyAction: '',
  },
  steelDamage: {
    damageRange: '',
    damageSeverity: '',
    damageCause: '',
    stabilityImpact: '',
    emergency: '',
    repairPlan: '',
    emergencyAction: '',
  },
  delamination: {
    delaminationRange: '',
    delaminationCause: '',
    stabilityImpact: '',
    emergency: '',
    repairPlan: '',
    emergencyAction: '',
  },
  rebarExposure: {
    exposureRange: '',
    exposureCondition: '',
    exposureCause: '',
    stabilityImpact: '',
    emergency: '',
    repairPlan: '',
    emergencyAction: '',
  },
  paintDamage: {
    damageRange: '',
    damageCondition: '',
    damageCause: '',
    emergency: '',
    repairPlan: '',
    emergencyAction: '',
  },
  overallAssessment: {
    overallResult: '',
    monitoringRequired: '',
    nextInspectionDate: '',
  },
};

const steps = ['기본 정보', '콘크리트 균열', '누수/백태', '강재 손상', '박리', '철근 노출', '도장 손상', '종합 평가'];

function ChecklistForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        defectTypes: prev.basicInfo.defectTypes.includes(type)
          ? prev.basicInfo.defectTypes.filter((t) => t !== type)
          : [...prev.basicInfo.defectTypes, type],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="checklist-container">
      <h1 className="checklist-title">결함 체크리스트</h1>

      <div className="step-indicator">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step ${index === currentStep ? 'active' : ''}`}
            onClick={() => setCurrentStep(index)}
            style={{ cursor: 'pointer' }}
          >
            {step}
          </div>
        ))}
      </div>

      <form className="checklist-form" onSubmit={handleSubmit}>
        {currentStep === 0 && (
          <BasicInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        {currentStep === 1 && <ConcreteCrackStep formData={formData} handleInputChange={handleInputChange} />}
        {currentStep === 2 && <LeakEfloStep formData={formData} handleInputChange={handleInputChange} />}
        {currentStep === 3 && <SteelDamageStep formData={formData} handleInputChange={handleInputChange} />}
        {currentStep === 4 && <DelaminationStep formData={formData} handleInputChange={handleInputChange} />}
        {currentStep === 5 && <RebarExposureStep formData={formData} handleInputChange={handleInputChange} />}
        {currentStep === 6 && <PaintDamageStep formData={formData} handleInputChange={handleInputChange} />}
        {currentStep === 7 && <OverallAssessmentStep formData={formData} handleInputChange={handleInputChange} />}

        <div className="form-navigation">
          <button type="button" onClick={handlePrev} disabled={currentStep === 0}>
            이전
          </button>

          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={handleNext}>
              다음
            </button>
          ) : (
            <button type="submit">제출</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ChecklistForm;
