import { RequestHandler, Request } from "express";
import Bid from "../../models/bid/bid";
import Product from "../../models/product/product";

export const bid: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  try {
    const bid = new Bid({ ...request.body, owner: request.user._id });
    await bid.save();
    const product = await Product.findOne({
      _id: request.body.product,
    }).populate([
      {
        path: "bids",
        populate: { path: "owner", select: "-__v -password -tokens" },
        options: { sort: { created_at: -1 } },
      },
      { path: "owner", select: "-__v -password -tokens" },
    ]);
    if (!product) response.status(404).send("Not Found");
    request.user.currencyAmount =
      request.user.currencyAmount - request.body.price;
    await request.user.save();
    product!.livePrice = request.body.price;
    await product!.save();
    response.json({
      product,
      bids: product!.bids,
      currencyAmount: request.user.currencyAmount,
    });
  } catch (error) {
    next(error);
  }
};
