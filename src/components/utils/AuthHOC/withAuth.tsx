import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const withAuth: (WrappedComponent: React.FC) => React.FC = (
  WrappedComponent: React.FC
) => {
  const HocComponent: React.FC = ({ ...props }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (auth.isLoggedIn === false) {
        navigate('/login', { replace: true });
      }
    }, [auth, navigate]);

    return <WrappedComponent {...props} />;
  };
  return HocComponent;
};

export default withAuth;
