import { RequestHandler } from "express";
import Account from "../../models/account/account";

export const logIn: RequestHandler = async (request, response, next) => {
  try {
    const account = await Account.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await account.generateAuthToken();
    response.status(200).json({ account, token });
  } catch (error) {
    // response.status(400).json({ error });
    next(error);
  }
};
