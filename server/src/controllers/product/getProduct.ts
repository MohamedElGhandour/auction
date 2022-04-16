import { RequestHandler } from "express";
import Product from "../../models/product/product";

export const product: RequestHandler = async (request, response) => {
  const _id = request.params.id;
  try {
    const product = await Product.findOne({ _id }).populate([
      {
        path: "bids",
        populate: { path: "owner", select: "-__v -password -tokens" },
        options: { sort: { created_at: -1 } },
      },
      { path: "owner", select: "-__v -password -tokens" },
    ]);

    if (!product) response.status(404).send("Not Found");
    response.json({ product, bids: product!.bids });
  } catch (error) {
    response.status(400).json(error);
  }
};
