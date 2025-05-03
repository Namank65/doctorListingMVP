export default function SideBar() {
  return (
    <div className=" bg-gray-100 text-black flex overflow-y-scroll justify-center font-bold w-1/4 relative sm:h-screen px-11">
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
          <input type="checkbox"/> 100-500
            </div>
            <div>
          <input type="checkbox"/> 500-1000
            </div>
            <div>
          <input type="checkbox"/> 1000+
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
