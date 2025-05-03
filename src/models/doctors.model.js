import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      require: [true, "Please Provide A Doctor Name"],
      trim: true,
    },
    experience: {
      type: Number,
      require: [true, "Please Provide Experience"]
    },
    fees: {
      type: Number,
      require: [true, "Please Provide Fees"],
    },
    hospitalVisit: {
      type: Boolean,
      default: true,
    },
    hospitalName: {
      type: String
    },
    avatar: {
      type: String,
      require: true,
    },
    language: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export const Doctors = mongoose.models?.Doctors || mongoose.model("Doctors", doctorsSchema);