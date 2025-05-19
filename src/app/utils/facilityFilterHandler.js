"use client"
import toast from "react-hot-toast";

export const facilityFilterHandeler = async ( setAllDoctorsData, facilityState ) => {
    try {
      const res = await fetch(`/api/filterdDoctor?${facilityState === "apolloHos" ? `apolloHospital=true` : ``}`)

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