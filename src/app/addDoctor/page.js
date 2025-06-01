"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Context } from "../utils/context";
import ImageUploader from "../utils/uploadAvatarImgKt";

const AddDoctorForm = () => {
  const { imageKitUploadResponce } = Context();
  const [formData, setFormData] = useState({
    doctorName: "",
    experience: "",
    fees: "",
    hospitalVisit: false,
    onlineConsult: false,
    apolloHospital: false,
    hospitalName: "",
    avatar: "",
    language: "",
  });

  useEffect(() => {
    if (imageKitUploadResponce) {
      setFormData((prev) => ({
        ...prev,
        avatar: imageKitUploadResponce,
      }));
    }
    if (imageKitUploadResponce) toast.success("Avatar Uploaded Successfully");
  }, [imageKitUploadResponce]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
      } else {
        toast.success("Doctor added successfully");

        for (let i = 0; i < e.target.length; i++) {
          let input = e.target[i];
          if (input) {
            input.value = "";
          }
          if (input.type === "checkbox") {
            input.checked = false;
          }
        }
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 py-10 items-center w-full"
    >
      <h1 className="text-2xl font-bold">Add Yourself As A Doctor</h1>
      <input
        name="doctorName"
        className="border w-6/12 p-2  rounded"
        placeholder="Doctor Name"
        onChange={handleChange}
        required
      />
      <input
        name="experience"
        className="border w-6/12 p-2  rounded"
        placeholder="Experience"
        onChange={handleChange}
        required
      />
      <input
        name="fees"
        className="border w-6/12 p-2  rounded"
        placeholder="Fees"
        type="number"
        onChange={handleChange}
        required
      />
      <input
        name="hospitalName"
        className="border w-6/12 p-2  rounded"
        placeholder="Hospital Name"
        onChange={handleChange}
        required
      />
      <ImageUploader />
      <div className="p-4 gap-4 flex items-center">
        <label htmlFor="language" className="block font-semibold mb-2">
          Select Language:
        </label>
        <select
          id="language"
          name="language"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">-- Choose a Language --</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
        </select>
      </div>

      <label className="flex gap-2">
        <input type="checkbox" name="hospitalVisit" onChange={handleChange} />
        Hospital Visit
        <input type="checkbox" name="onlineConsult" onChange={handleChange} />
        Online Consult
        <input type="checkbox" name="apolloHospital" onChange={handleChange} />
        Apollo Hospital
      </label>
      <button
        type="submit"
        className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white p-2 rounded"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctorForm;
