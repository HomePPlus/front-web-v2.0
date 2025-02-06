import React from 'react';
import './RadioGroup.css';

const RadioGroup = ({ title, fieldName, name, options, value, onChange }) => {
  return (
    <div className={`checklist-input-group checklist-input-group--${fieldName}`}>
      <label>{title}:</label>
      <div className="checklist-radio-group">
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
            />
            <span className="radio-label">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
