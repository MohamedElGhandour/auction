import myError from "../../../utility/myError";
import Account from "../account";
import bcrypt from "bcrypt";

export const findByCredentials = async (email: string, password: string) => {
  const user = await Account.findOne({ email });
  if (!user) throw new (myError as any)("Unable to login");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new (myError as any)("Unable to login");
  return user;
};
