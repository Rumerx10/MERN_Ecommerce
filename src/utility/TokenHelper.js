import jwt from "jsonwebtoken";

export const EncodeToken = () => {
  let KEY = "123-ABC-XYZ";
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = { email: "rume@gmail.com", userID: "123" };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const DecodeToken = (token) => {
  try {
    let KEY = "123-ABC-XYZ";
    return jwt.verify(token, KEY);
  } catch (error) {
    return null;
  }
};
