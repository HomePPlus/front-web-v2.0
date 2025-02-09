import React, { useState, useEffect } from 'react';
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
import { getInspectionReports, updateInspectionStatus } from "../../../api/apiClient";
import Loading from "../../common/Loading/Loading";

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
  const [inspections, setInspections] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInspections = async () => {
    try {
      const response = await getInspectionReports();
      // 예정됨, 진행중인 점검만 필터링
      const filteredData = response.data.data.filter(
        item => item.status === '예정됨' || item.status === '진행중'
      );
      setInspections(filteredData);
      setError(null);
    } catch (error) {
      setError("점검 목록을 불러오는데 실패했습니다.");
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handleStatusChange = async (inspectionId, newStatus) => {
    try {
      const response = await updateInspectionStatus(inspectionId, newStatus);
      
      if (response.data.status === 200 || response.status === 200) {
        await fetchInspections();
      } else {
        console.error("상태 변경 실패:", response.data.message);
      }
    } catch (error) {
      console.error("상태 변경 실패. 에러 상세:", error);
    }
  };

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

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="checklist-container">
      <h1 className="checklist-title">점검 체크리스트</h1>
      
      <div className="checklist-layout">
        <div className="inspection-list-section">
          <h2 className="inspection-list-title">점검 목록</h2>
          <div className="inspection-list">
            {inspections.map((inspection) => {
              const reportInfo = inspection.report_info || {};
              return (
                <div
                  key={inspection.inspection_id}
                  className={`inspection-item ${selectedInspection?.inspection_id === inspection.inspection_id ? 'selected' : ''}`}
                  onClick={() => setSelectedInspection(inspection)}
                >
                  <div className="inspection-info">
                    <div className="inspection-title">
                      <span>점검 ID: {inspection.inspection_id}</span>
                    </div>
                    <div className="inspection-details">
                      <span>예정일: {inspection.schedule_date}</span>
                      <span>주소: {reportInfo.detail_address || "-"}</span>
                      <span>신고된 결함: {reportInfo.defect_type || "-"}</span>
                      <span>AI 분석 결과: {inspection.detection_label || "분석 결과 없음"}</span>
                    </div>
                  </div>
                  <div className="inspection-status">
                    <select
                      className={`status-select ${inspection.status}`}
                      value={inspection.status}
                      onChange={(e) => handleStatusChange(inspection.inspection_id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="예정됨">예정됨</option>
                      <option value="진행중">진행중</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 체크리스트 폼 */}
        {selectedInspection ? (
          <div className="checklist-form-section">
            <div className="step-indicator">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`step ${index === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
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
                  inspection={selectedInspection}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}
              {currentStep === 1 && (
                <ConcreteCrackStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id} 
                />
              )}
              {currentStep === 2 && (
                <LeakEfloStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}
              {currentStep === 3 && (
                <SteelDamageStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}
              {currentStep === 4 && (
                <DelaminationStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}
              {currentStep === 5 && (
                <RebarExposureStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}
              {currentStep === 6 && (
                <PaintDamageStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}
              {currentStep === 7 && (
                <OverallAssessmentStep 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  inspectionId={selectedInspection?.inspection_id}
                />
              )}

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
        ) : (
          <div className="no-inspection-selected">
            왼쪽에서 점검 항목을 선택해주세요.
          </div>
        )}
      </div>
    </div>
  );
}

export default ChecklistForm;
