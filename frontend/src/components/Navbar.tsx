import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext.tsx";
import { AuthContextType } from "../types/authContextType.ts";

const Navbar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { user, getUser } = useAuthContext() as AuthContextType;

  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  return (
    <>
      {token && (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow w-screen">
          <div className="w-full flex flex-wrap items-center mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Expense Tracker
              </span>
            </Link>
            <div className="flex flex-col items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ms-auto">
              <button
                type="button"
                className="flex align-bottom text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={() => setToggle((prev) => !prev)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="/vite.svg"
                  alt="user photo"
                />
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                className={`z-50 ${
                  toggle === false ? "hidden" : ""
                } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 fixed top-9 right-4`}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user.username}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={() => {
                        localStorage.removeItem("authtoken");
                      }}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
