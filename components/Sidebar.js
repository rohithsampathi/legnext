// components/Sidebar.js

import React from 'react';
import Link from 'next/link';
import { Home, FileText, Users, Grid } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, isAdmin }) => {
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
        {isAdmin && (
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