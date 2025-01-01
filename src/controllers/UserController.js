import { UserOTPService } from "../services/UserServices.js";

export const UserOTP = async (req, res) => {
  const result = await UserOTPService(req);
  return res.status(200).json(result);
};
export const VerifyOTP = async (req, res) => {};
export const UserLogout = async (req, res) => {};
export const CreateProfile = async (req, res) => {};
export const UpdateProfile = async (req, res) => {};
export const ReadProfile = async (req, res) => {};
