import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import axiosPublic from '../components/AxiosPublic';
import app from '../firebase/firebase.config';

const provider = new GoogleAuthProvider();

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createSignIn = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSign = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };

        axiosPublic
          .post('/jwt', userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
              setLoading(false);
            }
          })
          .catch((error) => console.log(error));
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createSignIn,
    signIn,
    logOut,
    updateUserProfile,
    googleSign,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
