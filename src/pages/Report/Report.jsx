import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input/Input"; // Input 컴포넌트 임포트
import "./Report.css"; // CSS 파일을 별도로 만들어 스타일 적용
import Button from "../../components/common/Button/Button"; // Button 컴포넌트 임포트
import DropDown from "../../components/common/DropDown/DropDown"; // DropDown 컴포넌트 임포트
import FormGroup from "../../components/FormGroup/FormGroup";
import FileUpload from "../../components/FileUpload/FileUpload";
import { getUserInfo } from "../../utils/auth";

const Report = () => {
  const [address, setAddress] = useState(""); // 기본 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
  const [title, setTitle] = useState("");
  const [report, setReport] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 도로명 주소 또는 지번 주소를 선택했을 때의 처리
        const addr = data.roadAddress || data.jibunAddress;
        setAddress(addr);

        // 상세주소 입력 필드로 포커스 이동
        document.querySelector(".detailAddress-input").focus();
      },
    }).open();
  };

  const handleDropdownSelect = (value) => {
    setSelectedOption(value);
    console.log("선택된 값:", value);
  };

  const handleSubmit = () => {
    if (!address || !detailAddress || !report || !selectedOption) {
      alert("모든 항목을 입력해주세요.");
    } else {
      alert("신고가 성공적으로 제출되었습니다!");
    }
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          <h1>신고할 내용을 양식에 맞게 작성해주세요.</h1>
          <FormGroup>
            <div className="form-row">
              <label className="form-label">작성자</label>
              <Input
                className="name-input"
                value={getUserInfo()?.email || ""}
                disabled
              />
            </div>

            <div className="form-row">
              <div className="address-group">
                <label className="form-label">주소</label>
                <Input
                  className="address-input"
                  placeholder="주소를 검색해주세요"
                  value={address}
                  disabled
                />
                <Button
                  className="address-search"
                  onClick={handleAddressSearch}
                >
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

            <div className="form-row">
              <label className="form-label">제목</label>
              <Input
                className="title-input"
                placeholder="신고 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-row-text">
              <label className="form-content-label">내용</label>
              <textarea
                className="report-input"
                placeholder="신고 내용을 자세히 입력해주세요"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              />
            </div>

            <DropDown
              options={[
                "균열",
                "박리",
                "백태/누수",
                "철근 노출",
                "강재 손상",
                "도장 손상",
                "모름",
              ]}
              placeholder="선택"
              onSelect={handleDropdownSelect}
            />
            <FileUpload
              className="report-upload"
              onFileSelect={(file) => setSelectedFile(file)}
            />
          </FormGroup>
          <Button className="report-button" onClick={handleSubmit}>
            확인
          </Button>
          <Button className="report-cancel">취소</Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
