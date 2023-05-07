import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

const UserProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((state) => {
    return state.user;
  });

  if (!isLoading && isAuthenticated === true) {
    return children;
  } else if (isLoading === false && isAuthenticated === false) {
    // toast.error('Please Login First');
    return <Navigate to="/user/login" replace />;
  }
};

const ShopProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((state) => {
    return state.seller;
  });

  if (!isLoading && isAuthenticated === true) {
    return children;
  } else if (isLoading === false && isAuthenticated === false) {
    // toast.error('Please Login First');
    return <Navigate to="/shop/login" replace />;
  }
};

export { UserProtectedRoute, ShopProtectedRoute };
