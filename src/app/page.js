"use client";
import Link from "next/link";
import Doctor from "./components/allDoctors";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Context } from "./utils/context";

export default function Home() {
  const {allDoctorsData, setAllDoctorsData} = Context();

  useEffect(() => {
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
    doctorsData();
  }, []);

  return (
    <div className="flex justify-center w-fit h-full flex-col overflow-y-scroll px-5 gap-5 ">
      <h1 className="font-bold text-2xl py-8">
        Consult General Physicians Online - Internal Medicine Specialists
      </h1>
      <Link href={"/addDoctor"}>
        <button className="border cursor-pointer p-1 rounded-xl text-[#106C89] font-bold hover:text-[#3b575f]">
          Add New Doctor+
        </button>
      </Link>
      {allDoctorsData?.map((e) => (
        <Doctor key={e._id} doctor={e} />
      ))}
    </div>
  );
}