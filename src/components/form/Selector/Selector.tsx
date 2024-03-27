import React from "react";

type SelectorProps = {
  item: string;
  selectedItem: string;
  onClick: () => void;
  children?: React.ReactNode;
};

const Selector: React.FC<SelectorProps> = ({
  item,
  selectedItem,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className={`py-1  text-center rounded-lg ${
        selectedItem === item ? "bg-blue-500 text-white" : "bg-white/90"
      }`}
      onClick={onClick}
    >
      {children || item}
    </button>
  );
};

export default Selector;
