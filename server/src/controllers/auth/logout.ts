import { RequestHandler } from "express";
// import User from "../models/user";

export const logOut: RequestHandler = async (
  request: Request | any,
  response
) => {
  try {
    request.user.tokens = request.user.tokens.filter(
      (token: any) => token.token !== request.token
    );
    await request.user.save();
    response.send();
  } catch (error) {
    response.status(400).json(error);
  }
};
