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
const UserModel = mongoose.model("users", DataSchema);
export default UserModel;
