import React from "react";

type ButtonProps = {
  type: "submit" | "button" | "reset";
  variant?: "default" | "danger" | "relevante"  | "home"  | "white"; 
  className?: string;
  disabled?: boolean;
  isLoading: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type,
  variant = "default",
  className = "",
  disabled = false, 
  isLoading,
  onClick,
  children,
}) => {
  const getButtonClassName = (): string => {
    let buttonClassName = `w-full p-1 text-white rounded-lg relative ${className}`;

    if (variant === "default") {
      buttonClassName += " bg-blue-500";
    } else if (variant === "danger") {
      buttonClassName += " bg-red-500";
    } else if (variant === "white") { // Added "white" variant styles
      buttonClassName += " bg-white text-black border border-black";
    }else if (variant === "relevante") {
      buttonClassName += " bg-green-500";
    }else if (variant === "home") {
      buttonClassName += " bg-blue-400";
    }


    return buttonClassName;
  };

  return (
    <button
      type={type}
      className={getButtonClassName()}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={{
        
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? (
        <div role="status" className="flex justify-center">
          <div className="w-6 h-6 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
