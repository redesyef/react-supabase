import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { useTasks } from "./context/TaskContext";
import { PrivateRoute } from "./routes/PrivateRoute";
function App() {
  const { user } = useTasks();

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
          <Route
            path="/login"
            element={
              <PrivateRoute isAllowed={!user} redirectTo="/">
                <Login />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
