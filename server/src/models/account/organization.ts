import Account from "./account";
import { Schema } from "mongoose";
import { AccountDocument } from "../../types/accounts";

const organizationSchema = {
  location: {
    type: String,
    trim: true,
  },
};

const options = {
  discriminatorKey: "kind",
};

const schema: Schema<AccountDocument> = new Schema(organizationSchema, options);

const Organization = Account.discriminator("Organization", schema);

export = Organization;
