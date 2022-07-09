import schedule from "node-schedule";
import Product from "../models/product/product";
import Wallet from "../models/wallet/wallet";
import Account from "../models/account/account";

(async function () {
  const products = await Product.find().populate([
    {
      path: "bids",
      populate: { path: "owner", select: "-__v -password -tokens" },
      options: { sort: { createdAt: -1 } },
    },
    { path: "owner", select: "-__v -password -tokens" },
  ]);
  products.forEach(async (product) => {
    endAuction(product, "immediate");
    schedule.scheduleJob(new Date(product.closingDate), async function () {
      endAuction(product, "schedule");
    });
  });
})();

const endAuction = async (product: any, type: "schedule" | "immediate") => {
  if (product.closingDate > new Date() && type === "immediate") {
    product.state = "alive";
    product.successfulBidder = undefined;
    product.successfulAuction = undefined;
    await product.save();
  } else {
    product.state = "finished";
    if (product.bids.length > 0 && product.successfulAuction === undefined) {
      product.successfulAuction = true;
      // Detect The Winner Bidder and the Winner Bid.
      product.successfulBidder = {
        bid: product.bids[0]._id,
        bider: product.bids[0].owner._id,
      };
      // Detect The Lossing Bider
      const losersBidder: any[] = [];
      product.bids.forEach((bid: any) => {
        if (!(String(bid.owner._id) === String(product.bids[0].owner._id))) {
          if (!losersBidder.includes(bid.owner._id))
            losersBidder.push(bid.owner._id);
        }
      });
      // Detect The Lossing Biggest Bid
      if (losersBidder.length > 0) {
        const losersBiggestBid = losersBidder.map((loserBidder) => {
          let biggestBid = null;
          for (let index = 0; index < product.bids.length; index++)
            if (String(loserBidder) === String(product.bids[index].owner._id))
              biggestBid =
                biggestBid === null
                  ? product.bids[index]
                  : product.bids[index].price > biggestBid.price
                  ? product.bids[index]
                  : biggestBid;
          return biggestBid;
        });
        // Money back losing bidders
        losersBiggestBid.forEach(async (loserBiggestBid) => {
          const user = await Account.findOne({
            _id: loserBiggestBid.owner._id,
          });
          user!.currencyAmount = user!.currencyAmount + loserBiggestBid.price;
          const wallet = new Wallet({
            owner: loserBiggestBid.owner._id,
            amount: loserBiggestBid.price,
            type: true,
            state: "Refund after auction ends",
            bid: loserBiggestBid,
            product: loserBiggestBid.product,
          });
          await wallet.save();
          await user?.save();
        });
      }
    } else {
      product.successfulAuction = false;
    }

    await product.save();
  }
};
