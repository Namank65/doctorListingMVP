"use client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { context } from "../utils/context";

export default function SideBar() {

  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const {allDoctorsData, setAllDoctorsData} = context();

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;

    if (isChecked && inputName === "oneToFive") {
      setPriceRange({ min: 100, max: 500 }); 
    }

    if (isChecked && inputName === "FiveToOneK") {
      setPriceRange({ min: 500, max: 1000 });
    }

    if (isChecked && inputName === "OneKPlus") {
      setPriceRange({ min: 1000, max: 5000 }); 
    }
  };
  
  useEffect(() => {
    if (priceRange.max > 0 && priceRange.min > 0) {
      filterHandeler()
    }
    
  },[priceRange])
  
  
  const filterHandeler = async () => {
    try {
      const res = await fetch(`/api/filterdDoctor?minFees=${priceRange?.min}&maxFees=${priceRange?.max}`);
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

  return (
    <div className=" bg-gray-100 text-black md:flex hidden overflow-y-scroll justify-center font-bold w-1/4 relative sm:h-screen px-11">
      <div className="p-3 w-fit sm:block hidden">
        <div className="flex gap-20 py-3">
          <h1 className="text-lg">Filters</h1>
          <button className="text-[#106C89]">Clear all</button>
        </div>
        <div>
          <hr className="h-1 w-full opacity-20 rounded-2xl pb-5" />
          <button className="font-bold text-xs text-[#106C89] border border-[#106C89] px-4 py-2 rounded-xl">
            Show Doctors Near Me
          </button>
        </div>

        <div className="flex flex-col gap-5 py-5 accent-[#106C89]">

        <div className=" flex flex-col">
          <h2>Mode of Consult</h2>
          <lable className="font-normal" >
            <div>
          <input type="checkbox"/> Hospital Visit
            </div>
            <div>
          <input type="checkbox"/> Online Consult
            </div>
          </lable>
        </div>

        <div>
          <h2>Experience (In Years)</h2>
          <lable className="font-normal">
            <div>
          <input type="checkbox"/> 0-5
            </div>
            <div>
          <input type="checkbox"/> 6-10
            </div>
            <div>
          <input type="checkbox"/> 11+
            </div>
          </lable>
        </div>

        <div>
          <h2>Fees (In Rupees)</h2>
          <lable className="font-normal">
            <div>
          <input type="checkbox" name="oneToFive" onChange={handleCheckboxChange}/> 100-500
            </div>
            <div>
          <input type="checkbox" name="FiveToOneK" onChange={handleCheckboxChange}/> 500-1000
            </div>
            <div>
          <input type="checkbox" name="OneKPlus" onChange={handleCheckboxChange}/> 1000+
            </div>
          </lable>
        </div>

        <div>
          <h2>Language</h2>
          <lable className="font-normal">
            <div>
          <input type="checkbox"/> English
            </div>
            <div>
          <input type="checkbox"/> Hindi
            </div>
            <div>
          <input type="checkbox"/> Telugu
            </div>
          </lable>
        </div>

        <div>
          <h2>Facility</h2>
          <lable className="font-normal">
            <div>
          <input type="checkbox"/> Apollo Hospital
            </div>
            <div>
          <input type="checkbox"/> Other Clinics
            </div>
          </lable>
        </div>

        </div>
      </div>
    </div>
  );
}
