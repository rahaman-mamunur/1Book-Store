import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import useAdmin from '../hook/useAdmn';
import useAuth from '../hook/useAuth';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isPending] = useAdmin();

  if (loading && isPending) {
    return <Spinner />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
