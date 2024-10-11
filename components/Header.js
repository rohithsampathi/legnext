// components/Header.js

import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FaBuilding, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';

const Header = ({ toggleSidebar }) => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    router.replace('/login'); // Redirect to login after logout
  };

  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Hamburger menu for mobile */}
          <button
            onClick={toggleSidebar}
            className="mr-4 md:hidden focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2 focus:outline-none">
            <FaBuilding className="h-8 w-8" />
            <span className="text-2xl font-semibold">CommUnity Hub</span>
          </Link>
        </div>
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
