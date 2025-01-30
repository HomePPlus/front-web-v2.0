import React, { useState } from "react";
import "./DropDown.css";

const Dropdown = ({ options = [], placeholder = "선택", onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태 관리
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelectedOption(option); // 선택된 옵션 업데이트
    setIsOpen(false); // 드롭다운 닫기
    if (onSelect) onSelect(option); // 부모 컴포넌트에 선택된 값 전달
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <span className="dropdown-text">{selectedOption || placeholder}</span>
        <span className="dropdown-icon">▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
