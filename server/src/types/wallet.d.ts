import { Document, Model } from "mongoose";
import { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

export interface Wallet {
  owner: ObjectId;
  amount: number;
  state: string;
  type: boolean;
  product?: ObjectId;
  bid?: ObjectId;
}

// Methods
export interface WalletDocument extends Wallet, Document {
  toJSON: () => any; // any for now
  //   generateAuthToken: () => Promise<string>;
}

// Statics
export interface WalletModel extends Model<WalletDocument> {
  //   findByCredentials(email: string, password: string): Promise<BidDocument>;
}
