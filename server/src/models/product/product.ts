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
  startingPrice: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  livePrice: {
    type: Number,
    required: true,
  },
  categories: {
    type: [
      {
        category: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    validate(array: []) {
      if (array.length === 0) {
        throw new Error("categories are required.");
      }
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
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
  images: {
    type: [
      {
        image: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
    validate(array: []) {
      if (array.length === 0) {
        throw new Error("images are required.");
      }
    },
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
  successfulAuction: {
    type: Boolean,
  },
  state: {
    type: String,
    trim: true,
    required: true,
    default: "alive",
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
