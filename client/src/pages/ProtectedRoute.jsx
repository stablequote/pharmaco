import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null; // Decode token payload
  const navigate = useNavigate()
  if (!token) {
    // return <Navigate to="/login" />;
    return navigate("/login")
  }

  return <Outlet />;
};

export default PrivateRoute;