import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { useTasks } from "./context/TaskContext";
import { PrivateRoute } from "./routes/PrivateRoute";
function App() {
  const { session, user } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [session]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute isAllowed={!!user}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
