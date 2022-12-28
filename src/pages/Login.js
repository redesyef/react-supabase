import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, loginWithMagicLink } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithMagicLink(email, password);
  };

  useEffect(() => {
    if (supabase.auth.user()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="row p-4">
      <div className="col-md-4 offset-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <label htmlFor="email">Write your email:</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-2"
            placeholder="youremail@site.com"
            required
          />
          <label htmlFor="email">Write your password:</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-2"
            placeholder="password"
            required
          />
          <div className="ms-auto">
            <button disabled={loading} className="btn btn-primary ">
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

export default Login;
