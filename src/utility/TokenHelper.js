import jwt from "jsonwebtoken";
export const EncodeToken = (email, userID) => {
  let KEY = "123-ABC-$#@";
  let EXP = { expiresIn: "1h" };
  let PAYLOAD = { email: email, userID: userID };
  return jwt.sign(PAYLOAD, KEY, EXP);
};

export const DecodeToken = (token) => {
  try {
    let KEY = "123-ABC-$#@";
    return jwt.verify(token, KEY);
  } catch (error) {
    console.log("Invalid Token!");
  }
};
