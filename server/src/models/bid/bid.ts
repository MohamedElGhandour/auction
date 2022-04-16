import { model, Schema } from "mongoose";
import { BidDocument, BidModel } from "../../types/bid";
import { toJSON } from "./functions/index";

const { ObjectId } = Schema.Types;

const bidSchema = {
  owner: {
    type: ObjectId,
    required: true,
    ref: "Account",
  },
  product: {
    type: ObjectId,
    required: true,
    ref: "Product",
  },
  price: {
    type: Number,
    required: true,
  },
};

const options = {
  timestamps: true,
};

const schema: Schema<BidDocument> = new Schema(bidSchema, options);

schema.methods.toJSON = toJSON;

const Bid = model<BidDocument, BidModel>("Bid", schema);

export = Bid;
