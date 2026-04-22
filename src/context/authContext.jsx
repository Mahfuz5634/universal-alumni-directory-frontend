import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // reload হলে user restore
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  //Register
  const register = async (data) => {
    const res = await registerUser(data);
    return res;
  };

  // Login
  const login = async (data) => {
  const res = await loginUser(data);

  
  localStorage.setItem("token", res.token);
  localStorage.setItem("user", JSON.stringify(res.user));

  setUser(res.user);

  return res;
};

  //Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  //helper
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);