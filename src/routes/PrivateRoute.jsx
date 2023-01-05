import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export const PrivateRoute = ({
  isAllowed,
  redirectTo = "/login",
  children,
}) => {
  const { session, user } = useTasks();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user]);
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
