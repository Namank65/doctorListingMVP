import Link from "next/link";
import Doctor from "./components/allDoctors";

export default function Home() {
  return (
    <div className="flex justify-center w-fit h-full flex-col overflow-y-scroll px-5 gap-5 ">
      <h1 className="font-bold text-2xl py-8">Consult General Physicians Online - Internal Medicine Specialists</h1>
      <Link href={"/addDoctor"}>
      <button className="border cursor-pointer p-1 rounded-xl text-[#106C89] font-bold hover:text-[#3b575f]">Add New Doctor+</button>
      </Link>
      <Doctor/>
      <Doctor/>
      <Doctor/>
      <Doctor/>
      <Doctor/>
    </div>
  );
}
