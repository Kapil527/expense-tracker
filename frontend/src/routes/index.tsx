import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { AuthWrapper } from "./AuthWrapper";
import Home from "../home/Home";
import Settings from "../settings/Settings";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { PageNotFound } from "../components/PageNotFound";

const Routes = () => {
  const { authtoken } = useAuthContext();

  //defining routes for only authentication users.
  const routesForAuthenticatedOnly = {
    path: "/",
    element: <AuthWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  };

  //definign routes for only non authenticated user.
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];

  const routeForPageNotFound = [{ path: "*", element: <PageNotFound /> }];

  //combining and conditionally including routes based on authenticated status with createBrowserRouter.
  const router = createBrowserRouter([
    ...[routesForAuthenticatedOnly],
    ...(!authtoken ? routesForNotAuthenticatedOnly : []),
    ...routeForPageNotFound,
  ]);

  //providing the router Configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
