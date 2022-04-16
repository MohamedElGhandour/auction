import { Document, Model } from "mongoose";
import { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export interface Bid {
  owner: ObjectId;
  price: number;
  product: ObjectId;
}

// Methods
export interface BidDocument extends Bid, Document {
  toJSON: () => any; // any for now
  //   generateAuthToken: () => Promise<string>;
}

// Statics
export interface BidModel extends Model<BidDocument> {
  //   findByCredentials(email: string, password: string): Promise<BidDocument>;
}
