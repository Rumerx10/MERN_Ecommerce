import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const FeatureModel = mongoose.model("features", DataSchema);
