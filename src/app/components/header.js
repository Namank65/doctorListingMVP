import React from "react";
import { IoIosSearch } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import Image from "next/image";

const header = () => {
  return (
    <div className="bg-gray-100 z-10 sticky top-0 shadow-xl">
      <div className="flex flex-row justify-between px-2  md:px-32 py-2">
        <div className="flex flex-row">
          <Image
          className="w-12 md:w-16 "
            src="/apollo247.svg"
            alt="Description"
            width={60}
            height={46}
          />
          <div className="flex flex-row text-xs items-center px-1 md:px-6 md:text-sm md:text-l">
            <GrLocation className="text-2xl"/>
            <div className="  md:px-2">
              <p className="text-xs">Select location</p>
              <p className="flex items-center font-medium ">Select Address <IoChevronDown/> </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center border rounded-xl px-4">
          <IoIosSearch className="h-8 p-2 w-8 font-bold text-2xl"/>
          <input
            type="text"
            placeholder="Search Doctors, Specialities, Conditions etc."
            className=" h-8 p-2 px-5 w-10 md:w-xl focus:outline-none focus:ring-0"
          />
        </div>

        <div className="flex items-center md:border rounded-xl md:px-4 font-medium text-[#106C89] gap-3">
        <button className="cursor-pointer md:block hidden">
          Login
        </button>
        <FaRegCircleUser className="text-2xl" />
        </div>
      </div>
      <div className="h-12  w-full border-t-1 md:flex items-center justify-center hidden">
        <ul className="flex flex-row gap-10 font-medium cursor-pointer">
          <li className="hover:text-[#106C89] hover:underline">Buy Medicines</li>
          <li className="hover:text-[#106C89] hover:underline">Find Doctors</li>
          <li className="hover:text-[#106C89] hover:underline">Lab Tests</li>
          <li className="hover:text-[#106C89] hover:underline">Circle Membership</li>
          <li className="hover:text-[#106C89] hover:underline">Health Records</li>
          <li className="hover:text-[#106C89] hover:underline">Diabetes Reversal</li>
          <li className="hover:text-[#106C89] hover:underline">Buy Insurance</li>
        </ul>
      </div>
    </div>
  );
};

export default header;
