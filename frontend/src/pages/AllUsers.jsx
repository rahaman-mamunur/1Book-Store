import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';
import BackButtton from '../components/BackButton';
import Spinner from '../components/Spinner';
import useAxiosSecure from '../hook/useTokenSecure';

const AllUsers = () => {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      setLoading(true);
      const res = await axiosSecure.get('/users');
      setLoading(false);
      refetch();
      return res.data;
    },
  });

  const handleDelete = (id) => {
    setLoading(true);
    axiosSecure
      .delete(`/users/${id}`)
      .then(() => {
        setLoading(false);

        console.log('deleted');
      })
      .catch((error) => console.log(error));
  };

  const handleAdmin = (id) => {
    setLoading(true);
    axiosSecure
      .patch(`/users/${id}`)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.modifiedCount > 1) {
          refetch();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="mt-11 flex justify-evenly items-center">
        <BackButtton isAdmin={true} />
      </div>
      <div className="flex justify-around my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users : {users.length}</h2>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-500 rounded-md">No</th>
              <th className="border border-slate-500 rounded-md">Name</th>
              <th className="border border-slate-500 rounded-md">Email</th>
              <th className="border border-slate-500 rounded-md">Role</th>
              <th className="border border-slate-500 rounded-md">Operations</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{user?.name}</td>
                <td className="text-center">{user.email}</td>
                <td>
                  <div className="flex justify-center items-center">
                    {user.role === 'admin' ? (
                      'Admin'
                    ) : (
                      <button>
                        <RiAdminLine
                          className="text-red-400 text-3xl"
                          onClick={() => handleAdmin(user._id)}
                        />
                      </button>
                    )}
                  </div>
                </td>

                <td>
                  <div className="flex justify-center items-center">
                    <button>
                      <MdOutlineDelete
                        className="text-red-400 text-3xl"
                        onClick={() => handleDelete(user._id)}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default AllUsers;
