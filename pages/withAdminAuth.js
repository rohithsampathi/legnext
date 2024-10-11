// components/withAdminAuth.js
import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!user || !user.isAdmin) {
        router.replace('/dashboard');
      }
    }, [user]);

    if (!user || !user.isAdmin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
