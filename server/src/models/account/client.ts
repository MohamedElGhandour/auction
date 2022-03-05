import Account from "./account";
import { Schema } from "mongoose";
import { AccountDocument } from "../../types/accounts";

const clientSchema = {
  nationalId: {
    type: Number,
    trim: true,
    // validate(value: string) {
    //   if (!/^[a-zA-Z ]*$/.test(value)) {
    //     throw new Error(
    //       "This name contains certain characters that aren't allowed."
    //     );
    //   }
    // },
  },
  gender: {
    type: String,
    // validate(value: string) {
    //   if (!/^[a-zA-Z ]*$/.test(value)) {
    //     throw new Error(
    //       "This name contains certain characters that aren't allowed."
    //     );
    //   }
    // },
  },
};

const options = {
  discriminatorKey: "kind",
};

const schema: Schema<AccountDocument> = new Schema(clientSchema, options);

const Client = Account.discriminator("Client", schema);

export = Client;
