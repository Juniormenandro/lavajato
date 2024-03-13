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
  type = "text", // Valor padrão para "type"
}) => {
  //const inputId = `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="my-2">
      <label htmlFor={key} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      <input
        id={key}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 py-2 px-4 text-center border rounded-lg w-full`}
      />
    </div>
  );
};



export default TextInputSelector;
