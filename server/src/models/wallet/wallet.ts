import { model, Schema } from "mongoose";
import { WalletDocument, WalletModel } from "../../types/wallet";
import { toJSON } from "./functions/index";

const { ObjectId } = Schema.Types;

const walletSchema = {
  owner: {
    type: ObjectId,
    required: true,
    ref: "Account",
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: Boolean,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  product: {
    type: ObjectId,
    ref: "Product",
  },
  bid: {
    type: ObjectId,
    ref: "Bid",
  },
};

const options = {
  timestamps: true,
};

const schema: Schema<WalletDocument> = new Schema(walletSchema, options);

schema.methods.toJSON = toJSON;

const Wallet = model<WalletDocument, WalletModel>("Wallet", schema);

export = Wallet;
