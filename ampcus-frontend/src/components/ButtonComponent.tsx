import React from "react";

interface ButtonProps {
  onClick: () => void;
  color: string;
  bg:string;
  name: string;
  disabled:boolean
}

const Button: React.FC<ButtonProps> = ({ onClick,bg, color, name,disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled ={disabled}
     className={`px-4 py-2 ${bg} text-white rounded hover:${color} focus:outline-none focus:shadow-outline my-4`}>
      {name}
      
    </button>
  );
};

export default Button;