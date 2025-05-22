"use client"
import toast from "react-hot-toast";

export const languageFilterHandler = async (setAllDoctorsData, language) => {
    try {
      const res = await fetch(`/api/filterdDoctor?language=${language}`);
      const data = await res.json();
      setAllDoctorsData(data?.allDoctors)

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success("Filteration");
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };