import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const getUser = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/users/currentuser`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoggedIn(true);
        setUser(res.data.user);
      })
      .catch((err) => {
        setLoggedIn(false);
        setUser(null);
        console.log(err);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        hideNavbar,
        setHideNavbar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
