// import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  type: "primary" | "facebook" | "google";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, type, onClick, disabled = false } : ButtonProps) => {
  let className = "btn";

  if (type === "primary") className += " btn-primary";
  if (type === "facebook") className += " btn-facebook";
  if (type === "google") className += " btn-google";
  if (disabled) className += " btn-disabled";

  return (
    <button 
      className={className} 
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
};

export default Button;