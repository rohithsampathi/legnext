// components/Header.js

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FaBuilding, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const handleHomeClick = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={handleHomeClick}
          className="flex items-center space-x-2 focus:outline-none"
        >
          {/* Community building icon */}
          <FaBuilding className="h-8 w-8" />
          <span className="text-2xl font-semibold">CommUnity Hub</span>
        </button>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 focus:outline-none hover:underline"
        >
          <FaSignOutAlt className="h-6 w-6" />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
