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
import { getInspectionReports, updateInspectionStatus, submitChecklist } from "../../../api/apiClient";
import Loading from "../../common/Loading/Loading";
import { useNavigate } from 'react-router-dom';

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

const ChecklistForm = ({ onError, onSuccess }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [inspections, setInspections] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 결함 유형 변환 함수
  const translateDefectType = (type) => {
    const defectTypeMap = {
      'Crack': '균열',
      'Leak/Efflorescence': '누수/백태',
      'Steel Corrosion': '강재 부식',
      'Spalling': '박리',
      'Rebar Exposure': '철근 노출',
      'PaintDamage': '도장 손상',
      'crack': '균열',
      'leak': '누수/백태',
      'steel': '강재 부식',
      'spalling': '박리',
      'rebar': '철근 노출',
      'paint': '도장 손상',
      'normal': '정상',
    };
    return defectTypeMap[type] || type;
  };

  const fetchInspections = async () => {
    try {
      const response = await getInspectionReports();
      const filteredData = response.data.data.filter(
        item => item.status === '예정됨' || item.status === '진행중'
      );
      setInspections(filteredData);
      setError(null);
    } catch (error) {
      const errorMessage = "점검 목록을 불러오는데 실패했습니다.";
      setError(errorMessage);
      onError?.(errorMessage);
      console.error("Error fetching inspections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  // 선택된 점검이 변경될 때 기본 정보 자동 설정
  useEffect(() => {
    if (selectedInspection) {
      const reportInfo = selectedInspection.report_info || {};
      
      setFormData(prev => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          inspectionId: selectedInspection.inspection_id,
          inspectionDate: new Date().toISOString().split('T')[0], // 오늘 날짜
          address: reportInfo.detail_address || '',
        }
      }));
    }
  }, [selectedInspection]);

  const handleStatusChange = async (inspectionId, newStatus) => {
    try {
      const response = await updateInspectionStatus(inspectionId, newStatus);
      
      if (response.data.status === 200 || response.status === 200) {
        await fetchInspections();
        onSuccess?.("상태가 성공적으로 변경되었습니다.");
      } else {
        const errorMessage = "상태 변경에 실패했습니다.";
        onError?.(errorMessage);
        console.error("상태 변경 실패:", response.data.message);
      }
    } catch (error) {
      const errorMessage = "상태 변경 중 오류가 발생했습니다.";
      onError?.(errorMessage);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const requestData = {
        inspection_id: selectedInspection.inspection_id,
        inspection_date: formData.basicInfo.inspectionDate,
        inspector_name: formData.basicInfo.inspectorName,
        inspector_contact: formData.basicInfo.inspectorContact,
        address: formData.basicInfo.address,
        defect_types: formData.basicInfo.defectTypes,
        
        // 콘크리트 균열
        concrete_crack_type: formData.concreteCrack.type,
        concrete_crack_length_cm: formData.concreteCrack.length,
        concrete_crack_width_mm: formData.concreteCrack.width,
        concrete_crack_depth_mm: formData.concreteCrack.depth,
        concrete_crack_leakage: formData.concreteCrack.leakage,
        concrete_crack_movement: formData.concreteCrack.movement,
        concrete_crack_change: formData.concreteCrack.change,
        concrete_crack_condition: formData.concreteCrack.condition,
        concrete_crack_emergency: formData.concreteCrack.emergency,
        concrete_crack_emergency_action: formData.concreteCrack.emergencyAction,
        concrete_crack_repair_plan: formData.concreteCrack.repairPlan,

        // 누수/백태
        leak_eflo_leakage_range: formData.leakEflo.leakageRange,
        leak_eflo_leakage_cause: formData.leakEflo.leakageCause,
        leak_eflo_eflorescence: formData.leakEflo.eflorescence,
        leak_eflo_impact: formData.leakEflo.leakImpact,
        leak_eflo_emergency: formData.leakEflo.emergency,
        leak_eflo_emergency_action: formData.leakEflo.emergencyAction,
        leak_eflo_repair_plan: formData.leakEflo.repairPlan,

        // 강재 손상
        steel_damage_range: formData.steelDamage.damageRange,
        steel_damage_severity: formData.steelDamage.damageSeverity,
        steel_damage_cause: formData.steelDamage.damageCause,
        steel_damage_stability_impact: formData.steelDamage.stabilityImpact,
        steel_damage_emergency: formData.steelDamage.emergency,
        steel_damage_emergency_action: formData.steelDamage.emergencyAction,
        steel_damage_repair_plan: formData.steelDamage.repairPlan,

        // 박리
        delamination_range: formData.delamination.delaminationRange,
        delamination_cause: formData.delamination.delaminationCause,
        delamination_stability_impact: formData.delamination.stabilityImpact,
        delamination_emergency: formData.delamination.emergency,
        delamination_emergency_action: formData.delamination.emergencyAction,
        delamination_repair_plan: formData.delamination.repairPlan,

        // 철근 노출
        rebar_exposure_range: formData.rebarExposure.exposureRange,
        rebar_exposure_condition: formData.rebarExposure.exposureCondition,
        rebar_exposure_cause: formData.rebarExposure.exposureCause,
        rebar_exposure_stability_impact: formData.rebarExposure.stabilityImpact,
        rebar_exposure_emergency: formData.rebarExposure.emergency,
        rebar_exposure_emergency_action: formData.rebarExposure.emergencyAction,
        rebar_exposure_repair_plan: formData.rebarExposure.repairPlan,

        // 도장 손상
        paint_damage_range: formData.paintDamage.damageRange,
        paint_damage_cause: formData.paintDamage.damageCause,
        paint_damage_condition: formData.paintDamage.damageCondition,
        paint_damage_emergency: formData.paintDamage.emergency,
        paint_damage_emergency_action: formData.paintDamage.emergencyAction,
        paint_damage_repair_plan: formData.paintDamage.repairPlan,

        // 종합 평가
        overall_result: formData.overallAssessment.overallResult,
        monitoring_required: formData.overallAssessment.monitoringRequired,
        next_inspection_date: formData.overallAssessment.nextInspectionDate,
      };

      const response = await submitChecklist(requestData);
      
      // 체크리스트 데이터 분석
      const checklistSummary = {
        buildingName: formData.basicInfo.address,
        inspectorName: formData.basicInfo.inspectorName,
        inspectionDate: formData.basicInfo.inspectionDate,
      };

      // 상태 업데이트 후 페이지 이동
      // await handleStatusChange(selectedInspection.inspection_id, '완료');
      
      navigate('/checklist/complete', {
        state: {
          inspectionId: response.data.inspection_id,
          checklistData: checklistSummary,
          message: "체크리스트가 성공적으로 제출되었습니다."
        }
      });
    } catch (error) {
      console.error('체크리스트 제출 실패:', error);
      alert('체크리스트 제출에 실패했습니다.');
    }
  };

  // 주요 발견사항 추출
  const extractFindings = (formData) => {
    const findings = [];
    
    if (formData.concreteCrack.type) {
      findings.push(`콘크리트 균열: ${formData.concreteCrack.type} (${formData.concreteCrack.condition})`);
    }
    if (formData.leakEflo.leakageRange) {
      findings.push(`누수/백태: ${formData.leakEflo.leakageRange} (${formData.leakEflo.leakageCause})`);
    }
    if (formData.steelDamage.damageRange) {
      findings.push(`강재 손상: ${formData.steelDamage.damageRange} (${formData.steelDamage.damageSeverity})`);
    }
    if (formData.delamination.delaminationRange) {
      findings.push(`박리: ${formData.delamination.delaminationRange} (${formData.delamination.delaminationCause})`);
    }
    if (formData.rebarExposure.exposureRange) {
      findings.push(`철근 노출: ${formData.rebarExposure.exposureRange} (${formData.rebarExposure.exposureCondition})`);
    }
    if (formData.paintDamage.damageRange) {
      findings.push(`도장 손상: ${formData.paintDamage.damageRange} (${formData.paintDamage.damageCondition})`);
    }

    return findings;
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
      
      <div className={`checklist-layout ${selectedInspection ? 'form-active' : ''}`}>
        {!selectedInspection ? (
          <div className="inspection-list-form">
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
                      <span>신고된 결함: {translateDefectType(reportInfo.defect_type) || "-"}</span>
                      <span>AI 분석 결과: {translateDefectType(inspection.detection_label) || "분석 결과 없음"}</span>
                    </div>
                  </div>
                  <div className="inspection-status-form">
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
        ) : (
          <div className="checklist-form-section">
            <div className="checklist-form-header">
              <button 
                className="return-to-list-btn"
                onClick={() => setSelectedInspection(null)}
              >
                ← 점검 목록으로 돌아가기
              </button>
            </div>
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
                  handleSubmit={handleSubmit}
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
        )}
      </div>
    </div>
  );
}

export default ChecklistForm;
