import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    categoryName: { type: String, unique: true },
    categoryImg: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const CategoryModel = mongoose.model("categories", DataSchema);
