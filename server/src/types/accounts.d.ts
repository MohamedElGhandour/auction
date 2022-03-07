import { Document, Model } from "mongoose";

export interface Account {
  name: string;
  email: string;
  password: string;
  tokens: object[];
  avatar: Buffer;
  biography: string;
  description: string;
  currencyAmount: number;
}

export interface Client extends Account {
  nationalId: number;
  gender: "m" | "f";
}

export interface Organization extends Account {
  location: string;
}

// Methods
export interface AccountDocument extends Organization, Client, Document {
  toJSON: () => any; // any for now
  generateAuthToken: () => Promise<string>;
}

// Statics
export interface AccountModel extends Model<AccountDocument> {
  findByCredentials(email: string, password: string): Promise<AccountDocument>;
}
