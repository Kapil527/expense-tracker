import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/authContextType";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, authtoken, success } = useAuthContext() as AuthContextType;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(credentials.email, credentials.password);
  };
  useEffect(() => {
    if (success === true) {
      navigate("/");
      localStorage.setItem("authtoken", authtoken as string);
    }
  }, [success]);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center p-4">
        <div className="container bg-white shadow md:w-1/4 p-4 rounded">
          <h1 className="text-center text-3xl font-semibold text-[#296346]">
            Login
          </h1>
          <form
            className=" flex flex-col p-4 w-10/12 m-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              className={inputCss}
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              className={inputCss}
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button className="bg-[#296346] text-white font-semibold p-2 my-2 rounded hover:bg-white hover:text-[#296346] hover:shadow">
              Login
            </button>
            <div className="lower flex justify-between items-center">
              <Link to="/forget-password">
                <small className={lowerDivCSS}>ForgetPassword?</small>
              </Link>
              <Link to="/signup">
                <small className={lowerDivCSS}>SignUP</small>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

const inputCss = "p-2 outline-none my-2 border rounded";
const lowerDivCSS = "text-[#296346] hover:drop-shadow-2xl";
