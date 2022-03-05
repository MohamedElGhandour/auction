import { generateToken } from "../../../utility/jsonwebtoken";

export async function generateAuthToken(this: any) {
  const user = this;
  const token = generateToken({ _id: user._id.toString() });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}
