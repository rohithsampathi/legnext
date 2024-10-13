// components/Sidebar.js

import React, { useContext } from 'react';
import Link from 'next/link';
import { Home, FileText, Users, Grid } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';

const Sidebar = ({ activeView, setActiveView }) => {
  const { user } = useContext(AuthContext);
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <nav className={`bg-gray-800 text-white w-64 min-h-screen px-4 py-6 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <span className="text-xl font-semibold">Menu</span>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
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
        {user && user.isAdmin && (
          <>
            <li>
              <Link href="/manage-users" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <Users size={20} />
                <span>Manage Users</span>
              </Link>
            </li>
            <li>
              <Link href="/manage-categories" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <Grid size={20} />
                <span>Manage Categories</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;