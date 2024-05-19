import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContextType, UserType } from "../types/authContextType";
import { authAPIS } from "../util/Apis";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [authtoken, setAuthtoken] = useState(localStorage.getItem("authtoken"));
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    if (authtoken) {
      axios.defaults.headers.common["Authorization"] = authtoken;
      localStorage.setItem("authtoken", authtoken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("authtoken");
    }
  }, [authtoken]);

  const sendOTP = async (email: string) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/send-otp",
      {
        email: email,
      }
    );
    const { data } = response;
    if (data.success) setSuccess(true);
    else setSuccess(false);
    setMessage(data.message);
  };

  const login = async (email: string, password: string) => {
    setAuthtoken("");
    setSuccess(false);
    const response = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      {
        email,
        password,
      }
    );
    const { data } = response;
    if (data.success === true) {
      setAuthtoken(data.authtoken);
    } else {
      toast.error(data.message);
    }
    setSuccess(data.success);
  };

  async function getUser() {
    const response = await axios.get(authAPIS.getUser);

    const { data } = response;
    if (data.success) {
      setUser(data.user);
    }
    setSuccess(data.success);
    setMessage(data.message);
  }

  return (
    <AuthContext.Provider
      value={{ success, authtoken, message, user, sendOTP, login, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
