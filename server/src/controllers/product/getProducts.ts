import { RequestHandler } from "express";
import Product from "../../models/product/product";

// TODO add manipulate on query
export const products: RequestHandler = async (request, response) => {
  const match: any = {};
  const sort: any = {};
  if (request.query.completed)
    match.completed =
      (request.query.completed as string).toLowerCase() === "true";

  if (request.query.sortBy) {
    const parts = (request.query.sortBy as string).split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    const products = await Product.find({});
    response.status(200).json({ products });
  } catch (error) {
    response.status(400).json(error);
  }
};
