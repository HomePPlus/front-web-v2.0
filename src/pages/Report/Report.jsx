import React, { useState } from "react";
import Input from "../../components/common/Input/Input"; // Input 컴포넌트 임포트
import "./Report.css"; // CSS 파일을 별도로 만들어 스타일 적용
import Button from "../../components/common/Button/Button"; // Button 컴포넌트 임포트
import DropDown from "../../components/common/DropDown/DropDown"; // DropDown 컴포넌트 임포트
import FormGroup from "../../components/FormGroup/FormGroup";
import FileUpload from "../../components/FileUpload/FileUpload";

const Report = () => {
  const [address, setText] = useState("");
  const [title, titleText] = useState("");
  const [report, reportText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDropdownSelect = (value) => {
    console.log("선택된 값:", value);
    // 선택된 값을 처리하는 로직 추가
  };

  const handleSubmit = () => {
    if (!address || !report || !selectedOption) {
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
                value="kim2sangw@naver.com" // username에서 가입한 email을 자동으로 받아오게 변경
                disabled
              />
            </div>
            <div className="form-row">
              <div className="address-group">
                <label className="form-label">주소</label>
                <Input
                  className="address-input"
                  placeholder="주소 검색으로 주소 찾기를 진행해주세요."
                  onChange={() => {}}
                  disabled
                />
                <Button className="address-search">주소 검색</Button>
                <Input
                  className="detailAddress-input"
                  placeholder="상세주소를 입력해주세요."
                  value={address}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">제목</label>
              <Input
                className="title-input"
                placeholder="글의 제목을을 입력해주세요."
                value={title}
                onChange={(e) => titleText(e.target.value)}
              />
            </div>
            <div className="form-row-text">
              <label className="form-content-label">내용</label>
              <textarea
                className="report-input"
                placeholder="신고내용을 자세히 입력해주세요."
                value={report}
                onChange={(e) => reportText(e.target.value)}
              />
            </div>
            <DropDown
              options={[
                "선택",
                "균열",
                "박리",
                "백태/누수",
                "철근 노출",
                "강재 손상",
                "도장 손상",
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
