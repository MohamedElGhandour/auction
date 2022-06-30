import { RequestHandler, Request } from "express";
import Product from "../../models/product/product";
// import sharp from "sharp";

export const createProduct: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  try {
    console.log(request.body);
    const product = new Product({
      ...request.body,
      livePrice: request.body.startingPrice,
      owner: request.user._id,
    });
    await product.save();
    response.json(product);
  } catch (error) {
    next(error);
  }
};
