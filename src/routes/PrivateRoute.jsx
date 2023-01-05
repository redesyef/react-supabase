/* eslint-disable react-hooks/exhaustive-deps */
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
  const valideSession = () => {
    if (!session) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    valideSession();
  }, [user]);
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
