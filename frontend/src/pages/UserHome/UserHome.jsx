import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useTokenSecure';

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userStats = [] } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const { data: cartIds = [] } = useQuery({
    queryKey: ['cartIds'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/user-cartIds/${user?.email}`);
        console.log(res.data[0]);
        return res.data[0];
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center p-10 space-y-10">
        <div>
          <h2 className="text-3xl">
            <span>Welcome , </span>
            {user?.displayName ? (
              <span className="uppercase">{user.displayName}</span>
            ) : (
              'guest'
            )}
          </h2>
        </div>
        <div></div>
      </div>

      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <h2 className="text-xl font-bold mb-2">Dashboard</h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="useremail"
              >
                Email
              </label>
              <p className="text-gray-900 leading-tight">{user?.email}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <p className="text-gray-900 leading-tight">{user?.displayName}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="totalOrders"
              >
                Completed Transactions
              </label>
              <p className="text-gray-900 leading-tight">
                {userStats.payments}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="totalOrders"
              >
                Completed Orders
              </label>
              <p className="text-gray-900 leading-tight">
                {cartIds.totalCartIds ? cartIds.totalCartIds : 0}
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="totalOrders"
              >
                Recent Activity
              </label>
              <p className="text-gray-900 leading-tight">
                {user?.metadata?.lastSignInTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
