import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosPublic from '../../components/AxiosPublic';
import useAxiosSecure from '../../hook/useTokenSecure';
import { AuthContext } from '../../provider/AuthContext';

const SignUp = () => {
  const { createSignIn, updateUserProfile, googleSign } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const formRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    createSignIn(email, password)
      .then(() => {
        updateUserProfile(name)
          .then(() => {
            const updateInfo = {
              name,
              email,
            };
            axiosSecure.post('/users', updateInfo).then((res) => {
              console.log(res.data);
              formRef.current.reset();
              navigate('/');
            });

            console.log('profile updated');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setMessage('Email already in use.');
        } else {
          console.log(err);
        }
      });
  };

  const handleGoogle = () => {
    googleSign()
      .then((res) => {
        const googleUserInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };
        axiosPublic.post('/users/', googleUserInfo).then((res) => {
          console.log(res.data);
          console.log(res.user);
          navigate('/');
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col  ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold mb-5">SignUp now!</h1>

            <button
              className="btn btn-outline btn-accent mb-5"
              onClick={handleGoogle}
            >
              Google
            </button>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form ref={formRef} className="card-body" onSubmit={handleSubmit}>
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
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  name="name"
                  placeholder="Enter your name"
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
                  value="SingUp"
                  className="btn btn-primary"
                />
              </div>
            </form>
            {message && <div className="text-red-500 mt-2">{message}</div>}
            <span>
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
