import { RequestHandler } from "express";
import Wallet from "../../models/wallet/wallet";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2020-08-27",
});

export const payment: RequestHandler = async (
  request: Request | any,
  response
) => {
  try {
    const stripeRes = await stripe.charges.create({
      source: request.body.tokenId,
      amount: request.body.amount,
      currency: "usd",
    });
    request.user.currencyAmount =
      request.user.currencyAmount + stripeRes.amount / 100;
    await request.user.save();
    const transaction = new Wallet({
      owner: request.user._id,
      amount: stripeRes.amount / 100,
      type: true,
      state: "Deposit to e-wallet",
    });
    await transaction.save();
    response.status(200).json({
      stripeRes,
      currencyAmount: request.user.currencyAmount,
      transaction: transaction,
    });
  } catch (error) {
    response.status(400).json(error);
  }
};
