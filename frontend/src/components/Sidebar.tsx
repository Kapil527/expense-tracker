import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

const NavLinks = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/dashboard",
    name: "DashBoard",
  },
  {
    path: "/settings",
    name: "Settings",
  },
  {
    path: "/login",
    name: "Sign out",
  },
];

const BarIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const SideBar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="md:hidden w-full h-full bg-white">
      {/* Navbar */}
      <div className="header h-[50px] p-2 flex items-center w-full shadow">
        <button
          className="icon cursor-pointer mx-2"
          onClick={() => setSidebarCollapsed(false)}
        >
          {BarIcon}
        </button>
        <p className="text-xl font-semibold whitespace-nowrap dark:text-white mx-4">
          Express Tracker
        </p>
      </div>
      {/* Slider */}
      <div
        className={`${
          sidebarCollapsed ? "-left-3/4" : "left-0"
        } w-3/4 h-full p-2 bg-white shadow z-10 fixed top-0 ease-in-out duration-200 delay-100`}
      >
        <div className="upperSection h-1/5 flex justify-between">
          <div className="info flex flex-col justify-end">
            <div id="user-profile" className="ms-4">
              <img
                className="w-12 h-12 rounded-full"
                src="/vite.svg"
                alt="user photo"
              />
            </div>
            <div className="px-4 py-3 ms-2">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user.username}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {user.email}
              </span>
            </div>
          </div>
          <button
            className={`closeIcon fixed ${
              sidebarCollapsed ? "-left-3/4" : "left-2/3"
            } top-3 cursor-pointer ease-in-out duration-200 delay-100`}
            onClick={() => setSidebarCollapsed(true)}
          >
            {CloseIcon}
          </button>
        </div>
        <div className="divider h-[1px] bg-black mx-3"></div>
        <div className="LowerSection">
          <ul>
            {NavLinks.map((links, index) => {
              return (
                <li
                  key={index}
                  className="my-6 hover:bg-gray-400"
                  onClick={() => setSidebarCollapsed(true)}
                >
                  <Link to={links.path} className="p-4">
                    {links.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
