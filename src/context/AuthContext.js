import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const signUp = async (email, password) => {
    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Once the user is created, update the user's document in the Firestore database
      await setDoc(doc(db, "users", email), {
        watchList: [],
      });

      // After both operations are complete, you can navigate to the "/account" page
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, signIn, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
