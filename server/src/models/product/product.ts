import { model, Schema } from "mongoose";

const schema = new Schema(
  {},
  {
    timestamps: true,
  }
);

const Product = model("Product", schema);

export = Product;
