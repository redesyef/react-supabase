import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const loginWithMagicLink = async (email, password) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw error;
      }
      alert("check your email ");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTasks = async (done = false) => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { error, data } = await supabase
        .from("tasks")
        .select("id, name, done")
        .eq("userId", user.id)
        .eq("done", done)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }

      setTasks(data);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      //const user = supabase.auth.user();

      const { error, data } = await supabase
        .from("tasks")
        .insert({
          name: taskName,
          userId: user.id,
        })
        .select();

      setTasks([...tasks, ...data]);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setAdding(false);
    }
  };
  const updateTasks = async (id, updatedFields) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error, data } = await supabase
        .from("tasks")
        .update(updatedFields)
        .select()
        .eq("userId", user.id)
        .eq("id", id);
      if (error) {
        throw error;
      }

      setTasks(tasks.filter((task) => task.id !== data[0].id));
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error, data } = await supabase
        .from("tasks")
        .delete()
        .select()
        .eq("userId", user.id)
        .eq("id", id);

      if (error) {
        throw error;
      }

      setTasks(tasks.filter((task) => task.id !== data[0].id));
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [session]);
  const valideUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };
  useEffect(() => {
    valideUser();
  }, [session]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        updateTasks,
        deleteTask,
        loading,
        adding,
        loginWithMagicLink,
        logout,
        register,
        session,
        user,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
