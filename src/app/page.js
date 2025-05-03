import Doctor from "./components/allDoctors";

export default function Home() {
  return (
    <div className="flex justify-center w-fit h-full flex-col overflow-y-scroll">
      <h1 className="font-bold text-3xl p-10">Consult General Physicians Online - Internal Medicine Specialists</h1>
      <Doctor/>
      <Doctor/>
      <Doctor/>
      <Doctor/>
      <Doctor/>
    </div>
  );
}
