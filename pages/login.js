// pages/login.js

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import LoginView from '../components/LoginView';

const LoginPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // If the user is already authenticated, redirect to the dashboard
      router.replace('/dashboard');
    }
  }, [user, router]);

  return <LoginView />;
};

export default LoginPage;
