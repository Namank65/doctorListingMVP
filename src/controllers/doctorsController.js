"use server";

import { dbConnect } from "@/app/utils/dbConnection";
import { Doctors } from "@/models/doctors.model";
import { redirect } from "next/navigation";

export const signup = async (userName, email, password) => {

  try {
    await dbConnect()
    const doctor = await Doctors.findOne({ email });
    if (user) {
      throw new Error("User Already Existed");
    }
  
    await Doctors.create({
      userName,
      email,
      password,
    });
  
    return redirect("/login");

  } catch (error) {
    return error.message
  }
};