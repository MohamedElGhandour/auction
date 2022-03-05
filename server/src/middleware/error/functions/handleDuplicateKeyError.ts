import { Response } from "express";

//handle email or username duplicates
export const handleDuplicateKeyError = (err: any, res: Response) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `There is already a account with this ${field} address. Please Log In`;
  res.status(code).send({ messages: error, fields: field });
};
