import {
  ReadProfileService,
  SaveProfileService,
  UserOTPService,
  VerifyOTPService,
} from "../services/UserServices.js";

export const UserLogin = async (req, res) => {
  const result = await UserOTPService(req);
  return res.status(200).json(result);
};
export const VerifyLogin = async (req, res) => {
  const result = await VerifyOTPService(req);
  if (result.status === "success") {
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };
    res.cookie("accessToken", result.accessToken, cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};
export const UserLogout = async (req, res) => {
  console.log("From userLogout------>", req.cookies.accessToken);
  // let cookieOption = {
  //   expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //   httpOnly: false,
  // };
  res.clearCookie("accessToken");
  // res.cookie("accessToken", "", cookieOption);
  return res.status(200).json({ message: "logout successfull" });
};
export const CreateProfile = async (req, res) => {
  const result = await SaveProfileService(req);
  return res.status(200).json(result);
};
export const UpdateProfile = async (req, res) => {
  const result = await SaveProfileService(req);
  return res.status(200).json(result);
};
export const ReadProfile = async (req, res) => {
  const result = await ReadProfileService(req);
  return res.status(200).json(result);
};
