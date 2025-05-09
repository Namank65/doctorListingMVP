"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [allDoctorsData, setAllDoctorsData] = useState(null);

  return (
    <UserContext.Provider value={{ allDoctorsData, setAllDoctorsData }}>
      {children}
    </UserContext.Provider>
  );
}

// Optional custom hook
export const context = () => useContext(UserContext);
