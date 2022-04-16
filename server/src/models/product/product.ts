import { model, Schema } from "mongoose";
import { ProductDocument, ProductModel } from "../../types/product";
import { toJSON } from "./functions/index";

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
  startingPrice: {
    type: Number,
    required: true,
  },
  livePrice: {
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
  image: {
    type: String,
    required: true,
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
  toJSON: { virtuals: true },
};

const schema: Schema<ProductDocument> = new Schema(productSchema, options);

schema.virtual("bids", {
  ref: "Bid",
  localField: "_id",
  foreignField: "product",
});

schema.methods.toJSON = toJSON;

const Product = model<ProductDocument, ProductModel>("Product", schema);

export = Product;
