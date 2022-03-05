import { Response } from "express";

//handle field formatting, empty fields, and mismatched passwords
export const handleValidationError = (err: any, res: Response) => {
  let errors = Object.values(err.errors).map((el: any) => el.message);
  let fields = Object.values(err.errors).map((el: any) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(" ");
    res.status(code).send({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
  // res.status(400).send({ err });
};
