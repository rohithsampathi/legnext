// components/NotFoundView.js

import React from 'react';
import Link from 'next/link';

const NotFoundView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-8">
      Oops! The page you're looking for doesn't exist.
    </p>
    <Link href="/dashboard" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition duration-300">
      Go Back to Dashboard
    </Link>
  </div>
);

export default NotFoundView;