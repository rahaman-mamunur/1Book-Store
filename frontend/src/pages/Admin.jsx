import { Outlet } from 'react-router-dom';

const Admin = () => {
  const isAdmin = true;

  return (
    <>
      <Outlet />
    </>
  );
};
export default Admin;
