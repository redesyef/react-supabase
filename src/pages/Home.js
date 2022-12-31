import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TasksList from "../components/TasksList";
import { supabase } from "../supabase/client";
import { useTasks } from "../context/TaskContext";
function Home() {
  //const navigate = useNavigate();
  //const { user } = useTasks();
  const [showTasksDone, setShowTasksDone] = useState(false);

  // useEffect(() => {
  //   !user && navigate("/login");
  // }, [navigate, user]);

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
        <TaskForm />
        <header className="d-flex justify-content-between my-3">
          <span className="h5">{showTasksDone ? `Done Tasks` : "Tasks"}</span>
          <button
            onClick={() => setShowTasksDone(!showTasksDone)}
            className="btn btn-dark btn-sm"
          >
            {showTasksDone ? "Show tasks to do" : "Show tasks done"}
          </button>
        </header>

        {supabase.auth.user() && <TasksList done={showTasksDone} />}
      </div>
    </div>
  );
}

export default Home;
