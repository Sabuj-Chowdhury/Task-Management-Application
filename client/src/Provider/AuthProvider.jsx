import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import AuthContext from "../Context/AuthContext";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign in with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // log out
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // observer from firebase
  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);

      if (currentUser?.displayName && currentUser.photoURL) {
        console.log("CurrentUser-->", currentUser.email);
        const user = {
          email: currentUser?.email,
          name: currentUser?.displayName,
          image: currentUser.photoURL,
        };
        // save user data in te DB
        await axios.post(`${import.meta.env.VITE_URL}/users`, user);
      } else {
        //  if no user
        console.log("CurrentUser-->", null);
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  // props
  const authInfo = {
    signInWithGoogle,
    logOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
