import React from "react";

const Button = ({
  children,
  onClick,
  className,
  position = "absolute",
  borderRadius = "4px",
  backgroundColor = "#fafbfc",
  color = "#24292e",
  disabled = false,
  fontSize = "16px",
  fontWeight = "500px",
  padding = "8px 25px",
  border = "1px solid rgba(27, 31, 35, 0.15)",
}) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      style={{
        position,
        fontSize,
        fontWeight,
        padding,
        backgroundColor,
        border,
        borderRadius,
        cursor: disabled ? "not-allowed" : "pointer",
        color,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
