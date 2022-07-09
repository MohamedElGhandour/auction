import { RequestHandler } from "express";
import Product from "../../models/product/product";

export const search: RequestHandler = async (
  request: Request | any,
  response
) => {
  const productPattern = new RegExp(`^${request.body.name}`);
  const page = parseInt(request.query.page);
  const count = parseInt(request.query.count);
  try {
    const products = await Product.find({
      name: { $regex: productPattern },
      state: "alive",
    })
      .skip(count * (page - 1))
      .sort({ createdAt: -1 })
      .limit(count);
    const countProducts = await Product.find({
      name: { $regex: productPattern },
    }).countDocuments();
    response.json({ products, countProducts });
  } catch (error) {
    response.status(400).json(error);
  }
};
