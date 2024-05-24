import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/authContextType";

export const AuthWrapper = () => {
  const { authtoken } = useAuthContext() as AuthContextType;

  //Check if user is authenticated
  if (!authtoken) {
    // if not then rediredt the user to login page.
    return <Navigate to="/login" replace/>;
  }

  // if authenticated render the child route.
  return <Outlet />;
};
