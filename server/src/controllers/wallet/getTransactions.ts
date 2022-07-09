import { RequestHandler } from "express";
import Wallet from "../../models/wallet/wallet";

export const transactions: RequestHandler = async (
  request: Request | any,
  response
) => {
  try {
    const transactions = await Wallet.find({
      owner: request.user._id,
    }).sort([["createdAt", -1]]);
    response
      .status(200)
      .json({ transactions, currencyAmount: request.user.currencyAmount });
  } catch (error) {
    response.status(400).json(error);
  }
};
