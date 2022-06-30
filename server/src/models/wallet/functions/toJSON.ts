export function toJSON(this: any) {
  const wallet = this;
  const walletObject = wallet.toObject();
  delete walletObject.__v;
  return walletObject;
}
