import { MdOutlineDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useCart from '../../hook/useCart';
import useAxiosSecure from '../../hook/useTokenSecure';

const Carts = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );

  const handlerDelete = async (id) => {
    console.log('ok');
    const result = await axiosSecure.delete(`/carts/${id}`);
    console.log(result);
    refetch();
  };

  return (
    <>
      <div className="flex justify-evenly mb-8">
        <h2 className="text-4xl">Items : {cart.length} </h2>
        <h2 className="text-4xl">Total Price :{totalPrice.toFixed(2)}</h2>
        {cart.length ? (
          <Link to="/orders/payment">
            <button className="btn btn-primary">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn btn-primary">
            Pay
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Publish Year</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm opacity-50">{item.author}</div>
                    </div>
                  </div>
                </td>
                <td>$ {item.price}</td>
                <td>{item.publishYear}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <MdOutlineDeleteOutline
                      className="text-2xl text-red-600"
                      onClick={() => handlerDelete(item._id)}
                    />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Carts;
