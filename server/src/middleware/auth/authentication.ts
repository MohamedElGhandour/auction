import { Request, RequestHandler } from "express";
import { verifyToken } from "../../utility/jsonwebtoken";
const Account = require("../../models/account/account");

const auth: RequestHandler = async (request: Request | any, response, next) => {
  try {
    const token = (request.header("Authorization") as string).split(" ");
    if (token[0] !== "Bearer") throw new Error();
    const decoded = verifyToken(token[1]) as any;
    const user = await Account.findOne({
      _id: decoded._id,
      "tokens.token": token[1],
    });
    if (!user) throw new Error();
    request.token = token[1];
    request.user = user;
    next();
  } catch (error) {
    response.status(401).send({ error: "please authenticate" });
  }
};

export = auth;
