import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const Main = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes('login') || location.pathname.includes('signup');

  return (
    <>
      {noHeaderFooter || <Navbar />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </>
  );
};
export default Main;
