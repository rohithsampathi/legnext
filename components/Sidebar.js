// components/Sidebar.js

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Home, FileText, Users, Grid } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = ({ activeView, setActiveView }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleNavigation = (view) => {
    setActiveView(view);
    if (view === 'manage-users' || view === 'manage-categories') {
      router.push(`/${view}`);
    }
  };

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen px-4 py-6 hidden md:block">
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
              activeView === 'dashboard' ? 'bg-gray-700' : ''
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveView('issues')}
            className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
              activeView === 'issues' ? 'bg-gray-700' : ''
            }`}
          >
            <FileText size={20} />
            <span>Issues</span>
          </button>
        </li>
        {user.isAdmin && (
          <>
            <li>
              <button
                onClick={() => handleNavigation('manage-users')}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left ${
                  activeView === 'manage-users' ? 'bg-gray-700' : ''
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
                  activeView === 'manage-categories' ? 'bg-gray-700' : ''
                }`}
              >
                <Grid size={20} />
                <span>Manage Categories</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
