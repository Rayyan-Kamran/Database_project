import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
