import React, { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    theme: localStorage.getItem("theme") || "light", 
  });

  const [currentUser, setCurrentUser] = useState({
    displayName: "User Name",
    bio: "User Bio",
    profilePhoto: "",
    coverPhoto: "",
    email: "",
    photoURL: "",
  });

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const toggleTheme = () => {
    const newTheme = state.theme === "light" ? "dark" : "light";
    setState((prev) => ({ ...prev, theme: newTheme }));
    localStorage.setItem("theme", newTheme);
  };

  const updateUser = (updatedData) => {
    setCurrentUser((prevState) => ({ ...prevState, ...updatedData }));
  };

  const updateCurrentUser = (user) => {
    setCurrentUser({
      displayName: user?.displayName || "User Name",
      bio: user?.bio || "User Bio",
      profilePhoto: user?.photoURL || "",
      coverPhoto: "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    });
  };

  const signInWithGooglePopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      updateCurrentUser(user);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      updateCurrentUser(null);
    } catch (error) {
      console.error("Sign out error:", error.message);
      alert("Sign-out failed. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      updateCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const [posts, setPosts] = useState([]);
  
  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <AppContext.Provider value={{ state, currentUser, updateUser, toggleTheme, signInWithGooglePopup, signOutUser, addPost, posts }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
