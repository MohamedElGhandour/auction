import { Document, Model } from "mongoose";
import { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export interface Product {
  name: string;
  owner: ObjectId;
  startingPrice: number;
  livePrice: number;
  categories: object[];
  description: string;
  closingDate: Date;
  bids: ObjectId;
  images: object[];
  views: number;
  //   hidden: boolean;
}

// Methods
export interface ProductDocument extends Product, Document {
  toJSON: () => any; // any for now
  //   generateAuthToken: () => Promise<string>;
}

// Statics
export interface ProductModel extends Model<ProductDocument> {
  //   findByCredentials(email: string, password: string): Promise<ProductDocument>;
}
