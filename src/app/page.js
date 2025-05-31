"use client";
import Link from "next/link";
import Doctor from "./components/allDoctors";
import { Context } from "./utils/context";

export default function Home() {
  const {allDoctorsData, setPage, page, totalPage} = Context();
  const isPrev = page > 1
  const isnext = page < totalPage
  
  return (
    <div className="flex justify-center w-fit px-11 flex-col overflow-y-scroll gap-5 ">
      <h1 className="font-bold text-xl md:text-2xl py-8">
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

      {totalPage > 1 && <article className="flex gap-2 justify-center pb-2">
        <button disabled={!isPrev} className={`border px-4 text-white rounded-xl cursor-pointer ${!isPrev ? `bg-[#8b9396]`: `bg-[#106C89]`}`} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
        <span>{page} Of {totalPage}</span>
        <button disabled={!isnext} className={`border px-4 text-white rounded-xl cursor-pointer ${!isnext ? `bg-[#8b9396]`: `bg-[#106C89]`}`} onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </article>}
    </div>
  );
}