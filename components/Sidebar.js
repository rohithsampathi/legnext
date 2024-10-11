// components/Sidebar.js

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Home, FileText, Users, Grid, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleNavigation = (view) => {
    if (toggleSidebar) {
      toggleSidebar(); // Close the sidebar on navigation
    }
    router.push(`/${view}`);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 px-4 py-6 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:min-h-screen`}
    >
      {/* Close button for mobile */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className="text-xl font-semibold">Menu</h2>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <X className="h-6 w-6" />
        </button>
      </div>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
              router.pathname === '/dashboard' ? 'bg-gray-700' : ''
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation('add-issues')}
            className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
              router.pathname === '/add-issues' ? 'bg-gray-700' : ''
            }`}
          >
            <FileText size={20} />
            <span>Issues</span>
          </button>
        </li>
        {user && user.isAdmin && (
          <>
            <li>
              <button
                onClick={() => handleNavigation('manage-users')}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
                  router.pathname === '/manage-users' ? 'bg-gray-700' : ''
                }`}
              >
                <Users size={20} />
                <span>Manage Users</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('manage-categories')}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
                  router.pathname === '/manage-categories' ? 'bg-gray-700' : ''
                }`}
              >
                <Grid size={20} />
                <span>Manage Categories</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
