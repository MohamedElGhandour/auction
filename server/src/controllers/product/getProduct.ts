import { RequestHandler } from "express";
import Product from "../../models/product/product";

export const product: RequestHandler = async (request, response) => {
  const _id = request.params.id;
  try {
    const product = await Product.findOne({ _id });
    if (!product) response.status(404).send("Not Found");
    response.json(product);
  } catch (error) {
    response.status(400).json(error);
  }
};
