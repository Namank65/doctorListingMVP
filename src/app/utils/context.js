"use client";
import { createContext,  useContext,  useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [allDoctorsData, setAllDoctorsData] = useState(null);
    
    const doctorsData = async () => {
      try {
        const res = await fetch("/api/doctor");
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Something went wrong");
        } else {
          toast.success("All Doctors Data Fetched Successfully");
          setAllDoctorsData(data);
        }
      } catch (error) {
        toast.error("Server error");
        console.error(error);
      }
    };

  return (
    <UserContext.Provider value={{ allDoctorsData, setAllDoctorsData, doctorsData }}>
      {children}
    </UserContext.Provider>
  );
}

// Optional custom hook
export const Context = () => useContext(UserContext);
