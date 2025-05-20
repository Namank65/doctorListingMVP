"use client";
import Link from "next/link";
import Doctor from "./components/allDoctors";
import { useEffect, useState } from "react";
import { Context } from "./utils/context";

export default function Home() {
  const {allDoctorsData, doctorsData} = Context();
  const [page, setPage] = useState(0);

  useEffect(() => {
    doctorsData();
  }, []);

  return (
    <div className="flex justify-center w-fit px-11 flex-col overflow-y-scroll gap-5 ">
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

      <article className="flex gap-2 justify-center pb-2">
        <button className="border px-4 bg-[#106C89] text-white rounded-xl cursor-pointer" onClick={() => setPage((prev) => prev - 1)}>Prev</button>
        <span>{page}</span>
        <button className="border px-4 bg-[#106C89] text-white rounded-xl cursor-pointer" onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </article>
    </div>
  );
}