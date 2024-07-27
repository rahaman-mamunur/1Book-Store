import { useQuery } from '@tanstack/react-query';

import useAuth from '../hook/useAuth';
import useAxiosSecure from './useTokenSecure';

const useCart = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data;
    },
  });

  return [cart, refetch];
};
export default useCart;
