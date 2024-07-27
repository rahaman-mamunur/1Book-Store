import { FaAd, FaHome, FaList, FaShoppingCart } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../hook/useAdmn';

const Order = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-100">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/admin/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/orders/userHome">
                  <FaHome></FaHome>
                  User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/orders/cart">
                  <FaShoppingCart></FaShoppingCart>
                  My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders/payment">
                  <FaAd></FaAd>
                  Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders/paymentHistory">
                  <FaList></FaList>
                  Payments History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* orders content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Order;
