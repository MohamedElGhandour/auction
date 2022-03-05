import { RequestHandler } from "express";
import Account from "../../models/account/account";

export const logIn: RequestHandler = async (request, response, next) => {
  try {
    const user = await Account.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();
    response.status(200).json({ user, token });
  } catch (error) {
    // console.log(error);
    // response.status(400).json({ error });
    next(error);
  }
};
