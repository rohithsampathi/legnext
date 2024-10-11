// components/Select.js

import React from 'react';

const Select = ({ children, className = '', ...props }) => (
  <select
    {...props}
    className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
  >
    {children}
  </select>
);

export default Select;
