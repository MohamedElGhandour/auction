import { model, Schema } from "mongoose";
import { ProductDocument, ProductModel } from "../../types/product";

const { ObjectId } = Schema.Types;

const productSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
    // validate(value: string) {
    //   if (!/^[a-zA-Z ]*$/.test(value)) {
    //     throw new Error(
    //       "This name contains certain characters that aren't allowed."
    //     );
    //   }
    // },
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: "Account",
  },
  comments: {
    type: ObjectId,
    // required: true,
    ref: "Comment",
  },
  bids: {
    type: ObjectId,
    // required: true,
    ref: "bid",
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  startingDate: { type: Date, default: Date.now },
  closingDate: {
    type: Date,
    required: true,
    // validate(value: string) {
    //   if (!/^[a-zA-Z ]*$/.test(value)) {
    //     throw new Error(
    //       "This name contains certain characters that aren't allowed."
    //     );
    //   }
    // },
  },
  successfulBidder: {
    bid: {
      type: ObjectId,
      // required: true,
      ref: "bid",
    },
    bider: {
      type: ObjectId,
      // required: true,
      ref: "Account",
    },
  },
};

const options = {
  timestamps: true,
};

const schema: Schema<ProductDocument> = new Schema(productSchema, options);

const Product = model<ProductDocument, ProductModel>("Product", schema);

export = Product;
