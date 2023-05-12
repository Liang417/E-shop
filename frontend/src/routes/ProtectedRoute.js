import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader';

const UserProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((state) => {
    return state.user;
  });

  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      return <Navigate to="/user/login" replace />;
    }
    return children;
  }
};

const ShopProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((state) => {
    return state.seller;
  });

  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      return <Navigate to="/shop/login" replace />;
    }
    return children;
  }
};

export { UserProtectedRoute, ShopProtectedRoute };
