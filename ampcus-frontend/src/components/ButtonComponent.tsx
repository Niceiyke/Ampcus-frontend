import React from "react";

interface ButtonProps {
  onClick: () => void;
  color: string;
  bg:string;
  name: string;
}

const Button: React.FC<ButtonProps> = ({ onClick,bg, color, name }) => {
  return (
    <button
      onClick={onClick}
     className={`px-4 py-2 ${bg} text-white rounded hover:${color} focus:outline-none focus:shadow-outline my-4`}>
      {name}
    </button>
  );
};

export default Button;