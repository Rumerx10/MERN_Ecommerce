import mongoose from "mongoose";

const DataSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: Sring, required: true },
    img: { type: Sring, required: true },

    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },

  {
    timestamps: true,
    versionKey: true,
  }
);

export default mongoose.model("productsliders", DataSchema);
