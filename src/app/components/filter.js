"use client";
import { useEffect, useState } from "react";
import { Context } from "../utils/context";
import { FilterHandeler } from "../utils/feesFilterHandler";
import { ConsultFilterHandeler } from "../utils/consultFilterHandler";

export default function SideBar() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [hosVisit, setHosVisit] = useState();
  const [modeOfConsult, setModeOfConsult] = useState("");
  const { setAllDoctorsData, doctorsData } = Context();

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

    if (!isChecked) {
      doctorsData()
    }
  };

  const handleModeOfConsult = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;
    
    if (isChecked) {
      setModeOfConsult(inputName)
      setHosVisit(true)
    }else{
      setModeOfConsult("")
    }

    if (!isChecked) {
      doctorsData()
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (priceRange.max > 0 && priceRange.min > 0) {
          await FilterHandeler(priceRange, setAllDoctorsData);
        }
        if ( modeOfConsult === "hosVisit") {
          await ConsultFilterHandeler(setAllDoctorsData, hosVisit);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [priceRange, modeOfConsult]);
  

  return (
    <div className=" bg-gray-100 text-black md:flex hidden overflow-y-scroll justify-center font-bold w-1/4 relative sm:h-screen px-11">
      <div className="p-3 w-fit sm:block hidden">
        <div className="flex gap-20 py-3">
          <h1 className="text-lg">Filters</h1>
          <button onClick={() => doctorsData()} className="text-[#106C89] cursor-pointer hover:text-amber-500">Clear all</button>
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
            <lable className="font-normal">
              <div>
                <input type="checkbox" name="hosVisit" checked={modeOfConsult === 'hosVisit'} onChange={handleModeOfConsult} /> Hospital Visit
              </div>
              <div>
                <input type="checkbox" name="onlineConsult" checked={modeOfConsult === 'onlineConsult'} onChange={handleModeOfConsult} /> Online Consult
              </div>
            </lable>
          </div>

          <div>
            <h2>Experience (In Years)</h2>
            <lable className="font-normal">
              <div>
                <input type="checkbox" /> 0-5
              </div>
              <div>
                <input type="checkbox" /> 6-10
              </div>
              <div>
                <input type="checkbox" /> 11+
              </div>
            </lable>
          </div>

          <div>
            <h2>Fees (In Rupees)</h2>
            <lable className="font-normal">
              <div>
                <input
                  type="checkbox"
                  name="oneToFive"
                  onChange={handleCheckboxChange}
                />
                100-500
              </div>
              <div>
                <input
                  type="checkbox"
                  name="FiveToOneK"
                  onChange={handleCheckboxChange}
                />
                500-1000
              </div>
              <div>
                <input
                  type="checkbox"
                  name="OneKPlus"
                  onChange={handleCheckboxChange}
                />
                1000+
              </div>
            </lable>
          </div>

          <div>
            <h2>Language</h2>
            <lable className="font-normal">
              <div>
                <input type="checkbox" /> English
              </div>
              <div>
                <input type="checkbox" /> Hindi
              </div>
              <div>
                <input type="checkbox" /> Telugu
              </div>
            </lable>
          </div>

          <div>
            <h2>Facility</h2>
            <lable className="font-normal">
              <div>
                <input type="checkbox" /> Apollo Hospital
              </div>
              <div>
                <input type="checkbox" /> Other Clinics
              </div>
            </lable>
          </div>
        </div>
      </div>
    </div>
  );
}
