"use client"
import toast from "react-hot-toast";

export const ConsultFilterHandeler = async (fjg, setAllDoctorsData) => {
    try {
      const res = await fetch(`/api/filterdDoctor?hospitalVisit=${fjg}`);
      const data = await res.json();
      setAllDoctorsData(data?.allDoctors)
      console.log(data);

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