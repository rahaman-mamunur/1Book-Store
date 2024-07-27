import { useContext, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineCreateNewFolder, MdOutlineDelete } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import axiosPublic from '../components/AxiosPublic';
import Spinner from '../components/Spinner';
import { AuthContext } from '../provider/AuthContext';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get('/books')
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log('logout success');
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="mt-11 flex justify-evenly items-center"></div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Book List</h1>
          <button className="btn btn-active btn-accent">
            <Link to="/admin/allusers">All-Users</Link>
          </button>
          <button className="btn btn-active btn-accent">
            <Link to="/">Home</Link>
          </button>

          <button className="btn btn-active btn-accent" onClick={handleLogout}>
            Log-out
          </button>
          <Link to="/admin/books/create">
            <MdOutlineCreateNewFolder className="text-sky-700 text-4xl" />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-500 rounded-md">No</th>
                <th className="border border-slate-500 rounded-md">Image</th>
                <th className="border border-slate-500 rounded-md">Title</th>
                <th className="border border-slate-500 rounded-md">Author</th>
                <th className="border border-slate-500 rounded-md">
                  Publish Year
                </th>
                <th className="border border-slate-500 rounded-md">
                  Price ($)
                </th>
                <th className="border border-slate-500 rounded-md">Tags</th>
                <th className="border border-slate-500 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book?._id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={book?.image} alt={book?.title} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{book?.title}</td>
                  <td className="text-center">{book?.author}</td>
                  <td className="text-center">{book?.publishYear}</td>
                  <td className="text-center">{book?.price}</td>
                  <td className="text-center">{book?.tag}</td>
                  <td>
                    <div className="flex justify-center">
                      <Link to={`/admin/books/details/${book?._id}`}>
                        <TbListDetails />
                      </Link>
                      <Link to={`/admin/books/edit/${book?._id}`}>
                        <CiEdit />
                      </Link>
                      <Link to={`/admin/books/delete/${book?._id}`}>
                        <MdOutlineDelete className="text-red-400 " />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default Dashboard;
