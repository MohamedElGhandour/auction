import { RequestHandler } from "express";
import Product from "../../models/product/product";

export const product: RequestHandler = async (
  request: Request | any,
  response
) => {
  const _id = request.params.id;
  try {
    const product = await Product.findOne({ _id }).populate([
      {
        path: "bids",
        populate: { path: "owner", select: "-__v -password -tokens" },
        options: { sort: { createdAt: -1 } },
      },
      { path: "owner", select: "-__v -password -tokens" },
    ]);
    if (!product) response.status(404).send("Not Found");
    if (!(String(product?.owner._id) === String(request.user._id))) {
      product!.views = product!.views + 1;
      await product?.save();
    }
    response.json({ product, bids: product!.bids });
  } catch (error) {
    response.status(400).json(error);
  }
};
