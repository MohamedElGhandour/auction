import { RequestHandler } from "express";
import Product from "../../models/product/product";

// TODO add manipulate on query
export const products: RequestHandler = async (
  request: Request | any,
  response
) => {
  const page = parseInt(request.query.page);
  const count = parseInt(request.query.count);
  try {
    const products = await Product.find({ state: "alive" })
      .skip(count * (page - 1))
      .sort({ createdAt: -1 })
      .limit(count);
    const countProducts = await Product.find({
      state: "alive",
    }).countDocuments();
    response.status(200).json({ products, countProducts });
  } catch (error) {
    response.status(400).json(error);
  }
};
