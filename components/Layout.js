// components/Layout.js

import React, { useState, useContext } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { AuthContext } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return user ? (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  ) : (
    // If not authenticated, render children without Sidebar and Header
    <div className="min-h-screen flex flex-col">{children}</div>
  );
};

export default Layout;
