import { useQuery } from '@tanstack/react-query';
import useAuth from '../hook/useAuth';
import useTokenSecure from './useTokenSecure';

const useAdmin = () => {
  const axiosTokenSecure = useTokenSecure();
  const { user, loading } = useAuth();

  const { data: isAdmin = [], isPending } = useQuery({
    queryKey: ['isAdmin', user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosTokenSecure.get(`/users/admin/${user.email}`);
      return res.data?.admin;
    },
  });
  return [isAdmin, isPending];
};
export default useAdmin;
