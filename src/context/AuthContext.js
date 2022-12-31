import React, { useEffect, useState, createContext } from "react";
import supabase from "../supabase/client";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export const Auth = createContext();

export const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
      setUsuario(session);
      setShowChild(true);
    });
  }, [navigate]);

  if (!showChild) {
    return <Loading />;
  } else {
    return (
      <Auth.Provider
        value={{
          usuario,
        }}
      >
        {children}
      </Auth.Provider>
    );
  }
};
