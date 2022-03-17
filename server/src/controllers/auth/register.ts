import { RequestHandler } from "express";
import Client from "../../models/account/client";
import Organization from "../../models/account/organization";

export const register: RequestHandler = async (request, response, next) => {
  const type = (request.body.type as string).toLowerCase().trim();
  try {
    if (!(type === "client" || type === "organization"))
      throw new Error("should select type");
    const account =
      type === "client"
        ? new Client(request.body)
        : new Organization(request.body);
    await account.save();
    const token = await account.generateAuthToken();
    response.send({ account, token });
  } catch (error) {
    // response.status(400).json(error);
    next(error);
  }
};
// Checking if user already exists "There is already a user with this email address. Please Log In",

// router.post("/", async (request, response) => {
//   const user = new User(request.body);
//   try {
//     await user.save();
//     sendWelcomeEmail(user.email, user.name);
//     const token = await user.generateAuthToken();
//     response.send({ user, token });
//   } catch (error) {
//     response.status(400).json(error);
//   }
// });
