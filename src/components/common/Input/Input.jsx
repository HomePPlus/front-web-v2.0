import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = ({ placeholder, value, onChange, className, disabled }) => {
  return (
    <input
      type="text" // 단순 텍스트 입력으로 고정
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`form-input ${className}`} // 기본 클래스와 추가 클래스 병합
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired, // 필수: placeholder 텍스트
  value: PropTypes.string, // 입력된 값
  onChange: PropTypes.func, // 값 변경 핸들러
  className: PropTypes.string, // 추가 클래스 (선택)
  disabled: PropTypes.bool, // disabled 속성을 boolean으로 정의
};

Input.defaultProps = {
  value: "",
  onChange: () => {},
  className: "", // 기본적으로 추가 클래스 없음
  disabled: false,
};

export default Input;
