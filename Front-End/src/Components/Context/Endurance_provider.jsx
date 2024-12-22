import Endurance_context from "./Endurance_context";
import { useEffect, useState } from "react";

const Endurance_provider = ({ children }) => {
  const [UserLogged, setUserLogged] = useState(null);
  let isAuthenticated = UserLogged;
  
  const login = async (user) => {
    setUserLogged(user);
    console.log("Entre al provider", user);
  };

  const logout = () => {
    setUserLogged(null);
  };

  return (
    <Endurance_context.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </Endurance_context.Provider>
  );
};

export default Endurance_provider;
