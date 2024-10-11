// pages/index.js
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginView from '../components/LoginView';
import { AuthContext } from '../contexts/AuthContext';

export default function IndexPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  return <LoginView />;
}
