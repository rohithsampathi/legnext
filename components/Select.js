// components/Select.js

import React from 'react';

const Select = ({ children, className = '', ...props }) => (
  <select
    {...props}
    className={`w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
  >
    {children}
  </select>
);

export default Select;
