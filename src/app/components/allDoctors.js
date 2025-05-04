"use client";
import Image from "next/image";

export default function Doctor({ doctor }) {
  return (
    <div className="flex justify-center md:w-3xl h-fit border p-5 rounded-xl">
      <div className="flex ">
        <Image
          className="pr-5 w-fit"
          src="/apollo247.svg"
          alt="Description"
          width={60}
          height={46}
        />

        <div className="flex md:gap-40 gap-10">
          <div className="flex flex-col justify-start">
            <p className="font-bold text-xl">{doctor?.doctorName}</p>
            <p>Experience-{doctor?.experience} Years</p>
            <p>{doctor?.hospitalName}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h5 className="font-bold text-l">₹{doctor?.fees}</h5>
            <button className="border p-2 hover:text-[#415c65] cursor-pointer px-20 rounded-xl text-[#106C89] font-bold">
              Consult Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
