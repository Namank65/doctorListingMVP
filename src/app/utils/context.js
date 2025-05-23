"use client";
import { createContext,  useContext,  useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [allDoctorsData, setAllDoctorsData] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    
    const doctorsData = async () => {
      // if (experienceRange) baseUrl += `&minExperience=${experienceRange?.min}&maxExperience=${experienceRange?.max}`;
      // const {min, max} = experienceRange
      // console.log("congratulations");
      

      try {
        let baseUrl = `/api/filterdDoctor?page=${page}`
        
        let res = await fetch(baseUrl);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Something went wrong");
        } else {
          toast.success("All Doctors Data Fetched Successfully");
          setAllDoctorsData(data?.allDoctors);
          setTotalPage(data?.totalPage)
          console.log(data);
        }
      } catch (error) {
        toast.error("Server error");
        console.error(error);
      }
    };

  return (
    <UserContext.Provider value={{ allDoctorsData, setAllDoctorsData, doctorsData, setPage, page, totalPage }}>
      {children}
    </UserContext.Provider>
  );
}

// Optional custom hook
export const Context = () => useContext(UserContext);
