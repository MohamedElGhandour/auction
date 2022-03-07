import { RequestHandler, Request } from "express";
import Product from "../../models/product/product";

export const createProduct: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  const product = new Product({ ...request.body, owner: request.user._id });
  try {
    await product.save();
    response.json(product);
  } catch (error) {
    // response.status(400).json(error);
    next(error);
  }
};
