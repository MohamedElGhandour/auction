import { RequestHandler } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2020-08-27",
});

export const payment: RequestHandler = async (
  request: Request | any,
  response
) => {
  console.log("test ", request.body, request.user);
  try {
    const stripeRes = await stripe.charges.create({
      source: request.body.tokenId,
      amount: request.body.amount,
      currency: "usd",
    });
    request.user.currencyAmount =
      request.user.currencyAmount + stripeRes.amount;
    await request.user.save();
    response
      .status(200)
      .json({ stripeRes, currencyAmount: request.user.currencyAmount });
  } catch (error) {
    response.status(400).json(error);
  }
};
