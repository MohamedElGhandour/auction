import { RequestHandler } from "express";
import Product from "../../models/product/product";
export const search: RequestHandler = async (request, response) => {
  const productPattern = new RegExp(`^${request.body.name}`);
  try {
    const products = await Product.find({ name: productPattern });
    if (!products) response.status(404).send("Not Found");
    response.json(products);
  } catch (error) {
    response.status(400).json(error);
  }
};
