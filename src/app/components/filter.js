"use client";
import { useEffect, useState } from "react";
import { Context } from "../utils/context";
import { RxCross1 } from "react-icons/rx";

export default function SideBar() {
  const [languageState, setLanguageState] = useState("");
  const [priceState, setPriceState] = useState("");
  const [experienceState, setExperenceState] = useState("");
  const {
    doctorsData,
    setExperienceRange,
    experienceRange,
    language,
    setLanguage,
    modeOfConsult,
    setModeOfConsult,
    setHosVisit,
    facilityState,
    setFacilityState,
    priceRange,
    setPriceRange,
    page,
    mobileFilterState,
    setMobileFilterState,
  } = Context();

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;

    if (isChecked) {
      setPriceRange({ min: 100, max: 400 });
      setPriceState(inputName);
      if (inputName === "oneToFive") {
        setPriceRange({ min: 100, max: 400 });
        setPriceState(inputName);
      } else if (inputName === "FiveToOneK") {
        setPriceRange({ min: 500, max: 900 });
        setPriceState(inputName);
      } else if (inputName === "OneKPlus") {
        setPriceRange({ min: 1000, max: 5000 });
        setPriceState(inputName);
      }
    } else {
      setPriceRange({ min: 0, max: 0 });
      setPriceState("");
    }
  };

  const handleModeOfConsult = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;

    if (isChecked) {
      setModeOfConsult(inputName);
      setHosVisit(true);
    } else {
      setModeOfConsult("");
      setHosVisit(false);
    }
  };

  const facilityHandeler = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;

    if (isChecked) {
      setFacilityState(inputName);
      if (inputName === "apolloHos") {
        setFacilityState(inputName);
      } else if (inputName === "otherClinics") {
        setFacilityState(inputName);
      }
    } else {
      setFacilityState("");
    }
  };

  const languageHandler = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;

    if (isChecked) {
      if (inputName === "english") {
        setLanguage("English");
        setLanguageState(inputName);
      } else if (inputName === "hindi") {
        setLanguage("Hindi");
        setLanguageState(inputName);
      } else if (inputName === "telugu") {
        setLanguage("Telugu");
        setLanguageState(inputName);
      }
    } else {
      setLanguage("");
      setLanguageState("");
    }
  };

  const experienceHandler = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.name;

    if (isChecked) {
      if (inputName === "ZeroToFive") {
        setExperienceRange({ min: 1, max: 4 });
        setExperenceState(inputName);
      } else if (inputName === "sixToTen") {
        setExperienceRange({ min: 5, max: 9 });
        setExperenceState(inputName);
      } else if (inputName === "ellevenPlus") {
        setExperienceRange({ min: 10, max: 50 });
        setExperenceState(inputName);
      }
    } else {
      setExperienceRange({ min: 0, max: 0 });
      setExperenceState("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          (experienceRange.min > 0 && experienceRange.max > 0) ||
          language ||
          modeOfConsult ||
          facilityState ||
          (priceRange.max > 0 && priceRange.min > 0 && !modeOfConsult)
        ) {
          await doctorsData();
        } else {
          doctorsData();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    priceRange,
    modeOfConsult,
    experienceRange,
    language,
    facilityState,
    page,
  ]);

  return (
    <div
      className={` bg-gray-100 text-black md:flex md:overflow-y-scroll font-bold w-full md:w-1/4 absolute md:relative h-screen px-11 ${
        mobileFilterState ? `block` : `hidden`
      }`}
    >
      <div className="p-3 w-full  ">
        <div className="flex gap-10 py-3 justify-between items-center">
          <div className="flex gap-20">
            <h1 className="text-lg">Filters</h1>
            <button
              onClick={() => doctorsData()}
              className="text-[#106C89] cursor-pointer hover:text-amber-500"
            >
              Clear all
            </button>
          </div>
          <RxCross1 onClick={(prev) => setMobileFilterState(prev => !prev)} className="cursor-pointer md:hidden" />
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
                <input
                  type="checkbox"
                  name="hosVisit"
                  checked={modeOfConsult === "hosVisit"}
                  onChange={handleModeOfConsult}
                />
                Hospital Visit
              </div>
              <div>
                <input
                  type="checkbox"
                  name="onlineConsult"
                  checked={modeOfConsult === "onlineConsult"}
                  onChange={handleModeOfConsult}
                />
                Online Consult
              </div>
            </lable>
          </div>

          <div>
            <h2>Experience (In Years)</h2>
            <lable className="font-normal">
              <div>
                <input
                  type="checkbox"
                  name="ZeroToFive"
                  checked={experienceState === "ZeroToFive"}
                  onChange={experienceHandler}
                />
                0-5
              </div>
              <div>
                <input
                  type="checkbox"
                  name="sixToTen"
                  checked={experienceState === "sixToTen"}
                  onChange={experienceHandler}
                />
                6-10
              </div>
              <div>
                <input
                  type="checkbox"
                  name="ellevenPlus"
                  checked={experienceState === "ellevenPlus"}
                  onChange={experienceHandler}
                />
                11+
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
                  checked={priceState === "oneToFive"}
                  onChange={handleCheckboxChange}
                />
                100-500
              </div>
              <div>
                <input
                  type="checkbox"
                  name="FiveToOneK"
                  checked={priceState === "FiveToOneK"}
                  onChange={handleCheckboxChange}
                />
                500-1000
              </div>
              <div>
                <input
                  type="checkbox"
                  name="OneKPlus"
                  checked={priceState === "OneKPlus"}
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
                <input
                  type="checkbox"
                  name="english"
                  checked={languageState === "english"}
                  onChange={languageHandler}
                />
                English
              </div>
              <div>
                <input
                  type="checkbox"
                  name="hindi"
                  checked={languageState === "hindi"}
                  onChange={languageHandler}
                />
                Hindi
              </div>
              <div>
                <input
                  type="checkbox"
                  name="telugu"
                  checked={languageState === "telugu"}
                  onChange={languageHandler}
                />
                Telugu
              </div>
            </lable>
          </div>

          <div>
            <h2>Facility</h2>
            <lable className="font-normal">
              <div>
                <input
                  type="checkbox"
                  name="apolloHos"
                  checked={facilityState === "apolloHos"}
                  onChange={facilityHandeler}
                />
                Apollo Hospital
              </div>
              <div>
                <input
                  type="checkbox"
                  name="otherClinics"
                  checked={facilityState === "otherClinics"}
                  onChange={facilityHandeler}
                />
                Other Clinics
              </div>
            </lable>
          </div>
        </div>
      </div>
    </div>
  );
}
