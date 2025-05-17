"use client"
import toast from "react-hot-toast";

export const experienceFilterHandler = async (setAllDoctorsData,experienceRange) => {
    try {
      const {min, max} = experienceRange
      const res = await fetch(`/api/filterdDoctor?minExperience=${min}&maxExperience=${max}`);
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