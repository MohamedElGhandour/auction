import { RequestHandler } from "express";
import Bid from "../../models/bid/bid";

export const bids: RequestHandler = async (_request, response) => {
  try {
    const bids = await Bid.find({}).populate("owner").populate("product");
    response.status(200).json({ bids });
  } catch (error) {
    response.status(400).json(error);
  }
};
