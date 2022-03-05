import bcrypt from "bcrypt";
export async function hashPassword(this: any, next: Function) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
}
