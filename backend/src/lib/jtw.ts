
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_ACCESS_TOKEN || "my_secret";

// define the actual data being sent or received in a request or response.
export interface JwtUserPayload extends JwtPayload {
  id: number;            // user id 
  email: string;
  username: string;
  role: "user" | "admin"; // user role
}

// sign the accessToken
export function signAccessToken(payload: JwtUserPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

// to verifyAccessToken from the front
export function verifyAccessToken(token: string): JwtUserPayload {
  return jwt.verify(token, SECRET) as JwtUserPayload;
}