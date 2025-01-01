import { set } from "mongoose";
import UserModel from "./../models/UserModel.js";
import SendEmail from "../utility/EmailHelper.js";

export const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let OTP = Math.floor(100000 + Math.random() * 900000);
    console.log(OTP);
    await SendEmail(email, "You varification code" + OTP);
    await UserModel.updateOne(
      { email: email },
      { $set: { OTP: OTP } },
      { upsert: true }
    );
    return { status: "success", message: "6 digit OTP sent to your email" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
export const VerifyOTPService = async (req) => {};
export const LogoutService = async (req) => {};
export const CreateProfileService = async (req) => {};
export const UpdateProfileService = async (req) => {};
export const ReadProfileService = async (req) => {};
