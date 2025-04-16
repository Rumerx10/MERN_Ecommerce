import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import helmet from "helmet";
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import Router from "./src/routes/api.js";

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());
app.use(rateLimit({ windowMs: 15 * 60 * 60, max: 3000 }));
app.use(xss());
app.set("etag", false);

mongoose
  .connect(
    "mongodb+srv://rume:rume@cluster0.dwa2j.mongodb.net/EcommerceDatabase"
  )
  .then(() => {
    console.log("Connected successfully with MongoDB EcommerceDatabase.");
  })
  .catch((error) => {
    console.log(
      "Connection failed with MongoDB Database. Error:",
      error.message
    );
  });

app.get("/",(req,res)=>{
  res.send("Home page.")
})
app.use("/api", Router);
