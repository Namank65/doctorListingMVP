import { dbConnect } from "@/app/utils/dbConnection";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  const doctorName = searchParams.get("doctorName");
  const experience = searchParams.get("experience");
  const fees = searchParams.get("fees");
  const hospitalVisit = searchParams.get("hospitalVisit");
  const hospitalName = searchParams.get("hospitalName");
  const language = searchParams.get("language");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(process.env.DOCTOR_PER_PAGE_LIMIT) || 10;
  const skip = (page - 1) * limit;

  const baseQuery = {
    language: language,
  };

  if (doctorName) {
    baseQuery.doctorName = {
      $regex: doctorName,
      $options: "i",
    };
  }
  if (fees) {
    baseQuery.fees = {
      $gte: Number(fees),
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
        { error: "Somthing Went Wrong While Fetching Data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Somthing Went Wrong While Fetching Data" },
      { status: 400 },
      { allDoctors, totalPage }
    );
  } catch (error) {
    console.error("API GET /doctor error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
