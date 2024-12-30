import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    des: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const FeatureModel = mongoose.model("features", DataSchema);
export default FeatureModel;
