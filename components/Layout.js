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
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col">{children}</div>
  );
};

export default Layout;
