// components/Table.js

import React from 'react';

const Table = ({ children, className = '', ...props }) => (
  <table
    {...props}
    className={`w-full text-left border-collapse table-fixed ${className}`}
  >
    {children}
  </table>
);

export default Table;