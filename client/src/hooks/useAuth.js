import {
  useState,
  useEffect,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/authService";

export default function useAuth() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (token) {

      setUser({
        token,
      });

    }

  }, []);

  const login = async(data)=>{

    try{

      setLoading(true);

      const response =
        await loginUser(data);

      setUser(response);

      setError(null);

    }catch(err){

      setError(
        err.response?.data?.message ||
        "Login failed"
      );

    }finally{

      setLoading(false);

    }

  };

  const register = async(data)=>{

    try{

      setLoading(true);

      const response =
        await registerUser(data);

      setUser(response);

      setError(null);

    }catch(err){

      setError(
        err.response?.data?.message ||
        "Register failed"
      );

    }finally{

      setLoading(false);

    }

  };

  const logout = ()=>{

    logoutUser();

    setUser(null);

  };

  return {

    user,
    loading,
    error,
    login,
    register,
    logout,

  };

}