import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthContext';

// here changes

import axiosPublic from '../../components/AxiosPublic';

const Login = () => {
  const { signIn, googleSign } = useContext(AuthContext);
  const [message, setmessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setmessage('invalid-credential');
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then((res) => {
        const userInfo = { email: res.user.email };
        axiosPublic
          .post('/jwt', userInfo)
          .then((response) => {
            if (response.data.token) {
              localStorage.setItem('access-token', response.data.token);
              navigate('/');
            }
          })
          .catch((error) => {
            console.log(error);
            setmessage('Failed to get token');
          });
      })
      .catch((error) => {
        console.log(error);
        setmessage('Google Sign-In failed');
      });
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold mb-5">Login now!</h1>

            <button
              className="btn btn-outline btn-accent mb-5"
              onClick={handleGoogle}
            >
              Google
            </button>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
            </form>
            {message && <div className="text-red-500 mt-2">{message}</div>}
            <span>
              New User ? <Link to="/signup">Create an Account</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
