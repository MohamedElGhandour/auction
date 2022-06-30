import { RequestHandler } from "express";

export const paymentPhone: RequestHandler = async (
  request: Request | any,
  response
) => {
  try {
    request.user.currencyAmount =
      request.user.currencyAmount + request.body.amount;
    await request.user.save();
    response.status(200).json({ currencyAmount: request.user.currencyAmount });
  } catch (error) {
    response.status(400).json(error);
  }
};
