import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY as string;

// Generate a token from a payload
export const generateToken = (payload: object) => jwt.sign(payload, SECRET_KEY);

// Verify the token
export const verifyToken = (token: string) => jwt.verify(token, SECRET_KEY);
