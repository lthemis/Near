/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useState, createContext, useContext } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = (userId) => {
    // go to the cookie and put the ID
    setUser(userId);
    setCookie("userId", userId);
  };

  const logout = () => {
    setUser();
    removeCookie("userId");
  };

  const getUserFromSession = () => {
    return cookies.userId;
  };

  const checkIfAuthenticated = () => {
    // const authCookie = cookies['userId']
    const authCookie = getUserFromSession();
    if (authCookie) return true;
  };

  // inseted of userID put function checkifauth
  return (
    <AuthContext.Provider
      value={{ checkIfAuthenticated, getUserFromSession, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
  // return <AuthContext.Provider value={{checkIfAuthenticated, login, logout}}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
};
