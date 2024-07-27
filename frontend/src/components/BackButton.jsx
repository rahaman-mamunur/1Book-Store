import { Link } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';
const BackButtton = ({ isAdmin }) => {
  const defaultBackButton = isAdmin ? '/admin/adminHome' : '/';

  return (
    <div className="flex">
      <Link
        to={defaultBackButton}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <IoMdArrowRoundBack className="text-2xl" />
      </Link>
    </div>
  );
};
export default BackButtton;
