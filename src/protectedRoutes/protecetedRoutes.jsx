
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;