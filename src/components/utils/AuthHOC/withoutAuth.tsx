import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const withoutAuth: (WrappedComponent: React.FC) => React.FC = (
  WrappedComponent: React.FC
) => {
  const HocComponent: React.FC = ({ ...props }) => {
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (auth.isLoggedIn === true) {
        navigate('/', { replace: true });
      }
    }, [auth, navigate]);

    return <WrappedComponent {...props} />;
  };
  return HocComponent;
};

export default withoutAuth;
