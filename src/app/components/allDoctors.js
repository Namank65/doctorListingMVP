"use client";
import { Image } from "@imagekit/next";

export default function Doctor({ doctor }) {
  return (
    <div className="flex justify-between gap-8 md:gap-0 sm:w-xl md:w-3xl flex-col md:flex-row h-fit md:border p-5 rounded-xl">
      <div className="flex gap-5">
        <Image
          className=" md:w-fit"
          urlEndpoint={"https://ik.imagekit.io/8ehypq0zz"}
          src={doctor?.avatar || "/public/apollo247.png"}
          alt="Description"
          width={60}
          height={46}
        />

        <div className="flex flex-col justify-start">
          <p className="font-bold md:text-xl">{doctor?.doctorName}</p>
          <p>Experience-{doctor?.experience} Years</p>
          <p>{doctor?.hospitalName}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h5 className="font-bold text-l">₹{doctor?.fees}</h5>
        <button className="border p-2 text-xs md:text-sm hover:text-[#415c65] cursor-pointer px-15 md:px-20 rounded-xl text-[#106C89] font-bold">
          Consult Online
        </button>
      </div>
    </div>
  );
}
