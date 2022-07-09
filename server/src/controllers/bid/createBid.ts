import { RequestHandler, Request } from "express";
import Bid from "../../models/bid/bid";
import Product from "../../models/product/product";
import Wallet from "../../models/wallet/wallet";

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
        options: { sort: { createdAt: -1 } },
      },
      { path: "owner", select: "-__v -password -tokens" },
    ]);
    if (!product) {
      await Bid.findOneAndDelete({ _id: bid._id });
      return response.json({ msg: "PRODUCT NOT FOUND", statusText: "FAILED" });
    }
    if (String(product.owner._id) === String(request.user._id)) {
      await Bid.findOneAndDelete({ _id: bid._id });
      return response.json({
        msg: "YOU CANT BID FOR YOUR OWN PRODUCT",
        statusText: "FAILED",
      });
    }
    let biggestBidPrice = 0;
    for (let index = 0; index < product.bids.length; index++)
      if (String(bid._id) !== String(product.bids[index]._id))
        if (String(product.bids[index].owner._id) == String(request.user._id))
          biggestBidPrice =
            product.bids[index].price > biggestBidPrice
              ? product.bids[index].price
              : biggestBidPrice;

    const realPrice = request.body.price - biggestBidPrice;
    if (realPrice > request.user.currencyAmount)
      return response.json({ msg: "Charge your wallet", statusText: "FAILED" });
    request.user.currencyAmount = request.user.currencyAmount - realPrice;
    await request.user.save();
    product!.livePrice = request.body.price;
    await product!.save();
    console.log(realPrice, biggestBidPrice, request.body.price);
    const wallet = new Wallet({
      owner: request.user._id,
      amount: realPrice,
      type: false,
      state: "Draw to bid in auctions",
      bid: bid,
      product: product,
    });
    await wallet.save();
    return response.json({
      product,
      bids: product!.bids,
      currencyAmount: request.user.currencyAmount,
    });
  } catch (error) {
    return next(error);
  }
};
