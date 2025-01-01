import { DecodeToken } from "../utility/TokenHelper";

(req, res, next) => {
  let token = req.headers.token;
  if (!token) {
    token = req.cookies.token;
  }

  let decoded = DecodeToken(token);
  if (decoded === null) {
    return res
      .status(401)
      .json({ status: "fail", message: "Unauthorized Access" });
  } else {
    let { email, userID } = decoded;
    req.headers.email = email;
    req.headers.userID = userID;
    next();
  }
};
