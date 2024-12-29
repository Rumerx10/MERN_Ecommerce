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

export default mongoose.model("features", DataSchema);
