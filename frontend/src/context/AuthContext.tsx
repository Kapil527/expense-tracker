import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export interface AuthContextType {
  data?: string;
  authtoken?: string;
  success?: boolean;
  message?: string;
  sendOTP: (email: string) => Promise<void>;
  login?: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthState = ({ children }: { children: React.ReactNode }) => {
  const [authtoken, setAuthtoken] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

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
  return (
    <AuthContext.Provider
      value={{ success, authtoken, message, sendOTP, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
