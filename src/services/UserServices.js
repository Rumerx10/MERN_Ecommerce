import mongoose from "mongoose";
import { ProfileModel } from "../models/ProfileModel.js";
import { UserModel } from "../models/UserModel.js";
import { EncodeToken } from "../utility/TokenHelper.js";
import { SendEmail } from "./../utility/EmailHelper.js";

export const UserOTPService = async (req) => {
  try {
    console.log("Email------------>>> ", req.body.email);
    let email = req.body.email;
    let otp = Math.floor(Math.random() * 900000 + 100000);
    console.log("OTP------------>>> ", otp);
    // await SendEmail(
    //   "rume.atiltd@gmail.com",
    //   "OPT",
    //   `Your varification code is : ${otp}`
    // );
    const data = await UserModel.updateOne(
      { email: email },
      { $set: { otp: otp } },
      { upsert: true }
    );
    return {
      status: "success",
      message: "6 Digit OTP has been sent to your email.",
      data: data,
    };
  } catch (error) {
    return {
      status: "failed",
      message: "Something went worng!",
      error: error.message,
    };
  }
};

export const VerifyOTPService = async (req) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return {
        status: "fail",
        message: "Email and OTP are required.",
      };
    }
    const data = await UserModel.countDocuments({ email: email, otp: otp });
    if (data === 0) {
      console.log("Unauthorized user.");
      return {
        status: "fail",
        message: "Invalid email or OTP.",
      };
    } else {
      const userIdObject = await UserModel.findOne({
        email: email,
        otp: otp,
      }).select("_id");
      let token = EncodeToken(email, userIdObject["_id"].toString());
      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } });

      return {
        status: "success",
        message: "User authentication successfull",
        accessToken: token,
      };
    }
  } catch (error) {
    return {
      status: "fail",
      message: "Authorization failed.",
      error: error.message,
    };
  }
};

export const SaveProfileService = async (req) => {
  try {
    const userID = req.user.userID;
    // console.log("user id from user services----->", userID);
    let reqBody = req.body;
    // console.log(reqBody);
    const data = await ProfileModel.updateOne(
      { userID: userID },
      { $set: { ...reqBody, userID: new mongoose.Types.ObjectId(userID) } },
      { upsert: true }
    );
    return {
      status: "success",
      message: "Data saved successfully.",
      data: data,
    };
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong.",
      error: error.message,
    };
  }
};

export const ReadProfileService = async (req) => {
  try {
    const userID = req.user.userID;
    console.log(userID);
    const data = await ProfileModel.findOne({ userID: userID });
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "fail",
      message: "Something went wrong.",
      error: error.message,
    };
  }
};
