// components/withAuth.js

// components/withAuth.js

import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/');
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

