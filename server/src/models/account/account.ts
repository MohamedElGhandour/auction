import { model, Schema } from "mongoose";
import validator from "validator";
import { AccountDocument, AccountModel } from "../../types/accounts";
import {
  toJSON,
  generateAuthToken,
  // findByCredentials,
  hashPassword,
} from "./functions/index";

import myError from "../../utility/myError";
import bcrypt from "bcrypt";

const accountSchema = {
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value: string) {
      if (!/^[a-zA-Z ]*$/.test(value)) {
        throw new Error(
          "This name contains certain characters that aren't allowed."
        );
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minLength: 7,
    required: true,
    // validate(value: string) { // for strong password
    //   if (value.toLowerCase().includes("password"))
    //     throw new Error("Dont use 'Password' as your password");
    // },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
};

const options = {
  timestamps: true,
  discriminatorKey: "kind",
};

const schema: Schema<AccountDocument> = new Schema(accountSchema, options);

schema.methods.toJSON = toJSON;

schema.methods.generateAuthToken = generateAuthToken;

schema.statics.findByCredentials = async (email: string, password: string) => {
  const user = await Account.findOne({ email });
  if (!user)
    throw new (myError as any)(
      "The email address you entered isn't connected to an account."
    );
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new (myError as any)(
      "The password that you've entered is incorrect."
    );
  return user;
};

//  Hash the plain text password before saving
schema.pre("save", hashPassword);

const Account = model<AccountDocument, AccountModel>("Account", schema);

export = Account;
