import { dbConnect } from "@/app/utils/dbConnection";
import { Doctors } from "@/models/doctors.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const doctorName = searchParams.get("doctorName");
  const experience = searchParams.get("experience");
  const minFees = searchParams.get("minFees");
  const maxFees = searchParams.get("maxFees");
  const hospitalVisit = searchParams.get("hospitalVisit");
  const onlineConsult = searchParams.get("onlineConsult");
  const hospitalName = searchParams.get("hospitalName");
  const language = searchParams.get("language");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(process.env.DOCTOR_PER_PAGE_LIMIT) || 10;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (doctorName) {
    baseQuery.doctorName = {
      $regex: doctorName,
      $options: "i",
    };
  }

  if (minFees && maxFees) {
    baseQuery.fees = {
      $gte: Number(minFees),
      $lte: Number(maxFees),
    };
  } else if (maxFees) {
    baseQuery.fees = {
      $lte: Number(maxFees),
    };
  } else if (minFees) {
    baseQuery.fees = {
      $gte: Number(minFees),
    };
  }

  if (experience) {
    baseQuery.experience = {
      $gte: Number(experience),
    };
  }
  if (hospitalVisit) {
    baseQuery.hospitalVisit = hospitalVisit;
  }
  if (onlineConsult) {
    baseQuery.onlineConsult = onlineConsult;
  }
  if (hospitalName) {
    baseQuery.hospitalName = hospitalName;
  }
  if (language) {
    baseQuery.language = language;
  }

  try {
    await dbConnect();

    const [allDoctors, filteredOnlyProduct] = await Promise.all([
      Doctors.find(baseQuery).limit(limit).skip(skip),
      Doctors.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    if (!allDoctors || !totalPage) {
      return NextResponse.json(
        { error: "Sorry No Doctors Found At This Moment" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: "Filtered Data Fetched Successfully",
        allDoctors,
        totalPage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API GET /doctor error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
