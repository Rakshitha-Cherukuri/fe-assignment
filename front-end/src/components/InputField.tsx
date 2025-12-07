import { useState } from "react";
import "./InputField.css";
import EyeIcon from '../assets/EyeIcon.svg';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  hasEyeIcon?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
    label,
    type,
    placeholder,
    hasEyeIcon = false,
    value,
    onChange,
}: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="input-field">
        <label>{label}</label> 
        <div className="input-box"> 
          <input
            type={hasEyeIcon && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {hasEyeIcon && (
            <span onClick={togglePassword} className="eye-icon">
              <img src={EyeIcon} alt="Toggle password visibility" />
            </span>
          )}
        </div>
      </div>
    );
};

export default InputField;