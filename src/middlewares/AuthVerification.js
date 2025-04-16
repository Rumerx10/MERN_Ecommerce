import { DecodeToken } from "../utility/TokenHelper.js";

export const AuthVerification = (req, res, next) => {
  let token = req.headers["accessToken"] || req.cookies["accessToken"];
  // console.log("Form auth line 5 :: token--------->", token);
  let decoded;
  {
    token
      ? (decoded = DecodeToken(token))
      : res.status(401).send({
          status: "fail",
          message: "Toekn is not provided! Unauthorized user...",
        });
  }

  if (decoded === null) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized user!",
    });
  } else {
    // let { email, userID } = decoded;
    // req.headers.email = email;
    // req.headers.userID = userID;

    req.user = {
      email: decoded.email,
      userID: decoded.userID,
    }; // Access email and userID -----> req.user.email/userID
    next();
  }
};
