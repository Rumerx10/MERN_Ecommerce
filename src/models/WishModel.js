import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    userID: { type: String },
    productID: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export const WishModel = mongoose.model("wishes", DataSchema);
