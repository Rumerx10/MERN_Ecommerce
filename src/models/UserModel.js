import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String, required: true },
  },

  {
    timestamps: true,
    versionKey: true,
  }
);

export default mongoose.model("users", DataSchema);
