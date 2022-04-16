import { RequestHandler, Request } from "express";
import Product from "../../models/product/product";
// import sharp from "sharp";

export const createProduct: RequestHandler = async (
  request: Request | any,
  response,
  next
) => {
  try {
    // if (!request.file) throw new Error("Image is Required");
    // const buffer = await sharp(request.file.buffer).png().toBuffer();
    const product = new Product({
      ...request.body,
      owner: request.user._id,
      // image: buffer,
    });
    await product.save();
    response.json(product);
  } catch (error) {
    // response.status(400).json(error);
    next(error);
  }
};
