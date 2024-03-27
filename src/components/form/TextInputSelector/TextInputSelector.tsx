import React from "react";

type TextInputSelectorProps = {
  key: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder?: string;
  type?: "text" | "number";
};


const TextInputSelector: React.FC<TextInputSelectorProps> = ({
  key,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text", 
}) => {
  //const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="mb-10">
      <label htmlFor={key} className="block text-lg font-medium text-gray-50  bg-teal-700 rounded-lg w-52 p-1 ">
        {label}
      </label>
      <input
        id={key}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 py-1 px-4 text-lg text-center rounded-lg w-full`}
      />
    </div>
  );
};



export default TextInputSelector;
