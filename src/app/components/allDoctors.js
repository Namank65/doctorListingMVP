"use client";
import Image from "next/image";

export default function Doctor({ doctor }) {
  return (
    <div className="flex justify-center w-fit h-fit border p-5 rounded-xl">
      <div className="flex ">
        <Image
          className="pr-5 w-fit"
          src="/apollo247.svg"
          alt="Description"
          width={60}
          height={46}
        />

        <div className="flex gap-40">
          <div className="flex flex-col justify-start">
            <p className="font-bold text-xl">{doctor?.doctorName}</p>
            <p>{doctor?.experience}</p>
            <p>{doctor?.hospitalName}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h5 className="font-bold text-l">₹{doctor?.fees}</h5>
            <button className="border p-2 cursor-pointer px-28 rounded-xl text-[#106C89] font-bold">
              Consult Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
