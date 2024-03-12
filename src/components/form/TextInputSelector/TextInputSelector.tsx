import React from "react";

type TextInputSelectorProps = {
  label: string;
  value: string;
  onClick: (value: string) => void;
  type?: "text" | "number";
  placeholder?: string;
};

const TextInputSelector: React.FC<TextInputSelectorProps> = ({
  label,
  value,
  onClick,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div className="mb-4">
      <label className="block text-2xl mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onClick(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border-2 border-gray-300 rounded-lg text-lg"
      />
    </div>
  );
};

export default TextInputSelector;
