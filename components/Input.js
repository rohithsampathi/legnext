// components/Input.js
import React from 'react';

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
  />
);

export default Input;
