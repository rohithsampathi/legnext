// components/Footer.js
import React from 'react';

const Footer = () => (
  <footer className="bg-white shadow-inner py-4 px-6">
    <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
      &copy; {new Date().getFullYear()} CommUnity Hub. All rights reserved. Brewed for Lansum Eden Gardens with ❤️ by Think Tank Labs. 
    </div>
  </footer>
);

export default Footer;
