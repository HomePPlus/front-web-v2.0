import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input/Input'; // Input 컴포넌트 임포트
import './Report.css'; // CSS 파일을 별도로 만들어 스타일 적용
import Button from '../../components/common/Button/Button'; // Button 컴포넌트 임포트
import DropDown from '../../components/common/DropDown/DropDown'; // DropDown 컴포넌트 임포트
import FormGroup from '../../components/FormGroup/FormGroup';
import FileUpload from '../../components/FileUpload/FileUpload';
import { getUserInfo } from '../../utils/auth';
import { createReport } from '../../api/apiClient'; // 신고 생성 API 호출 함수 임포트

const Report = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState(''); // 기본 주소
  const [detailAddress, setDetailAddress] = useState(''); // 상세 주소
  const [title, setTitle] = useState(''); // 신고 제목
  const [report, setReport] = useState(''); // 신고 내용
  const [selectedOption, setSelectedOption] = useState(''); // 결함 유형 선택
  const [selectedFile, setSelectedFile] = useState(null); // 첨부 파일
  const [detectionResult, setDetectionResult] = useState(''); // 모델 결과 저장
  const [isModalOpen, setIsModalOpen] = useState(false); // 결과 모달

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/report/list');
  };

  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.roadAddress || data.jibunAddress;
        setAddress(addr);
        document.querySelector('.detailAddress-input').focus(); // 상세주소 입력 필드로 포커스 이동
      },
    }).open();
  };

  // 드롭다운 선택 핸들러
  const handleDropdownSelect = (value) => {
    setSelectedOption(value);
    console.log('선택된 값:', value);
  };

  // 신고 제출 핸들러
  const handleSubmit = async () => {
    if (!address || !detailAddress || !report || !selectedOption) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'report',
      JSON.stringify({
        reportTitle: title,
        reportDetailAddress: `${address} ${detailAddress}`,
        reportDescription: report,
        defectType: selectedOption,
      })
    );
    if (selectedFile) {
      formData.append('images', selectedFile);
    }

    try {
      const response = await createReport(formData);
      const detectionResult = response.data.data.detectionResult;

      if (detectionResult && detectionResult.trim() !== '') {
        // 결함이 있는 경우
        // 영어 결함 유형을 한글로 변환하는 함수
        const translateDefectType = (englishType) => {
          const typeWithoutNumber = englishType.replace(/[0-9_]/g, '').trim();
          const defectTypes = {
            CRACK: '균열',
            crack: '균열',
            LEAK_WHITENING: '백태/누수',
            leak_whitening: '백태/누수',
            Efflorescence_Level: '백태/누수',
            EfflorescenceLevel: '백태/누수',
            STEEL_DAMAGE: '강재 손상',
            steel_damage: '강재 손상',
            SteelDefectLevel: '강재 손상',
            PAINT_DAMAGE: '도장 손상',
            paint_damage: '도장 손상',
            PaintDamage: '도장 손상',
            PEELING: '박리',
            peeling: '박리',
            Spalling: '박리',
            REBAR_EXPOSURE: '철근 노출',
            rebar_exposure: '철근 노출',
            Exposure: '철근 노출',
            UNKNOWN: '모름',
            unknown: '모름',
          };

          // 대소문자 구분 없이 매칭
          const normalizedType = typeWithoutNumber.toLowerCase();
          const matchedType = Object.entries(defectTypes).find(([key]) => key.toLowerCase() === normalizedType);

          return matchedType ? matchedType[1] : englishType;
        };

        // 쉼표로 구분된 결함 유형들을 배열로 분리하고 각각 번역
        const translatedResults = Array.from(
          new Set(
            detectionResult.split(',').map((type) => {
              // 숫자와 언더스코어 제거
              const typeWithoutNumber = type.replace(/[0-9_]/g, '').trim();
              return translateDefectType(typeWithoutNumber);
            })
          )
        ).join(', '); // Set으로 중복 제거
        setDetectionResult(
          `이미지 분석이 완료되었습니다!

              ${translatedResults} 유형의 결함이 발견되었습니다.
              
              빠른 시일 내에 전문가가 방문하여 자세히 살펴보도록 하겠습니다!`
        );
      } else {
        // 결함이 없는 경우
        setDetectionResult(
          `분석 결과 즉각적인 조치가 필요한 위험한 결함은 발견되지 않았습니다.
      
                  전문 점검자가 이미지를 상세히 검토한 후,
                  필요한 경우 점검 안내를 드리도록 하겠습니다!
      
                  안전한 주거 환경을 위해 지속적으로 관리하겠습니다.`
        );
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error('신고 제출 중 오류:', error);
      alert('신고 제출 중 오류가 발생했습니다.');
    }
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="detection-message">{children}</div>
          <Button onClick={onClose}>닫기</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '100px',
          }}
        >
          <h1>신고할 내용을 양식에 맞게 작성해주세요.</h1>
          <FormGroup>
            {/* 작성자 */}
            <div className="form-row">
              <label className="form-label">작성자</label>
              <Input className="name-input" value={getUserInfo()?.email || ''} disabled />
            </div>

            {/* 주소 입력 */}
            <div className="form-row">
              <div className="address-group">
                <label className="form-label">주소</label>
                <Input className="address-input" placeholder="주소를 검색해주세요" value={address} disabled />
                <Button className="address-search" onClick={handleAddressSearch}>
                  주소 검색
                </Button>
                <Input
                  className="detailAddress-input"
                  placeholder="상세주소를 입력해주세요"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
              </div>
            </div>

            {/* 제목 입력 */}
            <div className="form-row">
              <label className="form-label">제목</label>
              <Input
                className="title-input"
                placeholder="신고 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 신고 내용 */}
            <div className="form-row-text">
              <label className="form-content-label">내용</label>
              <textarea
                className="report-input"
                placeholder="신고 내용을 자세히 입력해주세요"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              />
            </div>

            {/* 결함 유형 선택 */}
            <DropDown
              options={['균열', '박리', '백태/누수', '철근 노출', '강재 손상', '도장 손상', '모름']}
              placeholder="선택"
              onSelect={handleDropdownSelect}
            />

            {/* 파일 업로드 */}
            <FileUpload className="report-upload" onFileSelect={(file) => setSelectedFile(file)} />
          </FormGroup>

          {/* 버튼 */}
          <Button className="report-button" onClick={handleSubmit}>
            확인
          </Button>
          <Button className="report-cancel">취소</Button>

          {/* 결과 표시 */}
          {detectionResult && (
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
              <h3>이미지 분석 결과</h3>
              <p>{detectionResult}</p>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
