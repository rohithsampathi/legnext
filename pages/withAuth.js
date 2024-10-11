// components/withAuth.js
import { useRouter } from 'next/router';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.replace('/');
        } else {
          setAuthorized(true);
        }
      }
    }, [loading, user, router]);

    if (!authorized) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
