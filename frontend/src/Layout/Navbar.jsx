import { useContext } from 'react';

import { BiLogOut } from 'react-icons/bi';
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useAdmin from '../hook/useAdmn';
import useCart from '../hook/useCart';
import { AuthContext } from '../provider/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li className="text-2xl">
        <Link to="/">Home</Link>
      </li>
      <li className="text-2xl">
        <Link to="/orders/cart">
          <button className="btn">
            <BsCart2 />
            <div className="badge">+{cart.length}</div>
          </button>
        </Link>
      </li>
      {user ? (
        <>
          <button onClick={handleLogout}>
            <BiLogOut className="text-2xl" />
          </button>
        </>
      ) : (
        <>
          {' '}
          <li className="text-2xl">
            <Link to="/login">Login</Link>
          </li>
        </>
      )}

      {user && isAdmin && (
        <li>
          <Link to="/admin/adminHome">Admin</Link>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <Link to="/orders/userHome">{user?.displayName}</Link>
        </li>
      )}
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">1 Book Store</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
