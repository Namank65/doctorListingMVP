import { dbConnect } from "@/app/utils/dbConnection";
import { Doctors } from "@/models/doctors.model";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      doctorName,
      experience,
      fees,
      hospitalVisit,
      hospitalName,
      avatar,
      language,
    } = body;

    console.log(doctorName,
        experience,
        fees,
        hospitalVisit,
        hospitalName,
        avatar,
        language,);
         

    if (
      !doctorName ||
      !experience ||
      !fees ||
      !hospitalName ||
      !avatar ||
      !language
    ) {
      return NextResponse.json(
        { error: "All Fields Are Required" },
        { status: 400 }
      );
    }

    await dbConnect();

    await Doctors.create({
      doctorName,
      experience,
      fees,
      hospitalVisit,
      hospitalName,
      avatar,
      language,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Doctor added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something Went Wrong During Adding new Doctor" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  return Response.json({ message: `Doctor name is ${name}`});
}
