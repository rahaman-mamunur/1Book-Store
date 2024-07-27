import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useTokenSecure';
import Dashboard from '../Dashboard';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = [] } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center p-10 space-y-10">
        <div>
          <h2 className="text-3xl">
            <span>Welcome , </span>
            {user?.displayName ? user.displayName : 'guest'}
          </h2>
        </div>
        <div>
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Books</div>
              <div className="stat-value">{stats.bookItems}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Users</div>
              <div className="stat-value text-secondary">{stats.users}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Transaction</div>
              <div className="stat-value">{stats.payments}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Dashboard />
      </div>
    </>
  );
};
export default AdminHome;
