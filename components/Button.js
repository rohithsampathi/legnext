// components/Button.js
import React from 'react';

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`px-4 py-3 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-200 ease-in-out w-full ${className}`}
  >
    {children}
  </button>
);

export default Button;
