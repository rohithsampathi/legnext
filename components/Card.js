// components/Card.js

import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div
    {...props}
    className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
  <div
    {...props}
    className={`px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary to-secondary text-white ${className}`}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div {...props} className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export default Card;
