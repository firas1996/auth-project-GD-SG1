import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  email: "",
  password: "",
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: () => {},
});
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem("abc");
    if (item === "123") {
      setIsLoggedIn(true);
    }
    // console.log("aaa");
  }, []);
  // console.log("zzz");
  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("abc", "123");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("abc");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
