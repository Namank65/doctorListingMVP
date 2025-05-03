import Image from "next/image";

export default function Doctor() {
    return (
      <div className="flex justify-center w-full h-fit border p-10 ">
        <div className="flex gap-10">
        <Image
            src="/apollo247.svg"
            alt="Description"
            width={60}
            height={46}
          />

          <div>
            <p>Dr.sddfjoiweut90rw</p>
            <p>Experience</p>
            <p>Hospital</p>
          </div>
          <div>
            <h5>500Rs</h5>
          <button className="border p-5 cursor-pointer">Consult</button>
          </div>
        </div>
      </div>
    );
  }
  