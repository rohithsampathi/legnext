// components/Input.js

import React from 'react';

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
  />
);

export default Input;
