export function toJSON(this: any) {
  const product = this;
  const productObject = product.toObject();
  delete productObject.__v;
  return productObject;
}
