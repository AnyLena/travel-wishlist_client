import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Initializes a new Context object for auth-related data.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null);

  const login = async (formData, setLoading, setError) => {
    setLoading(true);
    const api_url = import.meta.env.VITE_SERVER;
    try {
      const response = await axios.post(`${api_url}/user/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const { token, user } = response.data;

      console.log(user)
      console.log(token)

      localStorage.setItem("jwt", token);
      setToken(token);
      setUser(user);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const api_url = import.meta.env.VITE_SERVER;
        try {
          const response = await axios.get(`${api_url}/user/user`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.log(error.message);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
