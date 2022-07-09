import { RequestHandler } from "express";
import Account from "../../models/account/account";
import Product from "../../models/product/product";

export const profile: RequestHandler = async (
  request: Request | any,
  response
) => {
  try {
    const page = parseInt(request.query.page);
    const count = parseInt(request.query.count);
    const profile = await Account.findOne({
      _id: request.user._id,
    });
    const products = await Product.find({ owner: request.user._id })
      .skip(count * (page - 1))
      .sort({ createdAt: -1 })
      .limit(count);
    const countProducts = await Product.find({
      owner: request.user._id,
    }).countDocuments();
    response.status(200).json({ profile, products, countProducts });
  } catch (error) {
    response.status(400).json(error);
  }
};
