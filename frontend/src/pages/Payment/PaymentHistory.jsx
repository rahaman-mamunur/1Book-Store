import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlineDoneAll } from 'react-icons/md';
import Spinner from '../../components/Spinner';
import useAuth from '../../hook/useAuth';
import useCart from '../../hook/useCart';
import useAxiosSecure from '../../hook/useTokenSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      setLoading(true);
      const res = await axiosSecure.get(`/payments/${user.email}`);
      setLoading(false);
      refetch();
      return res.data;
    },
  });

  const handleSucess = async (id) => {
    try {
      setLoading(true);
      const res = await axiosSecure.patch(`/payment-succes/${id}`);
      setLoading(false);
      refetch();
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <h2 className="text3-xl">Total Payments: {payments.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>price</th>
                <th>Transaction Id</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>${payment.price}</td>
                  <td>{payment.transactionId}</td>
                  <td>
                    <div>
                      {payment.status === 'success' ? (
                        'success'
                      ) : (
                        <button>
                          <MdOutlineDoneAll
                            className="text-green-400 text-3xl"
                            onClick={() => handleSucess(payment._id)}
                          />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default PaymentHistory;
