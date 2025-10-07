// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_ACCESS_TOKEN || "my_secret";



// export function signAccessToken(payload: any) {
//   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
// }

// export function verifyAccessToken(token: string) {
//   return jwt.verify(token, SECRET);
// }


import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = process.env.JWT_ACCESS_TOKEN || "my_secret";

// 定义 payload 类型
export interface JwtUserPayload extends JwtPayload {
  id: number;            // 用户 ID
  email: string;
  username: string;
  role: "user" | "admin"; // 用户角色
}

/** 生成 token */
export function signAccessToken(payload: JwtUserPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

/** 验证 token 并返回 payload */
export function verifyAccessToken(token: string): JwtUserPayload {
  return jwt.verify(token, SECRET) as JwtUserPayload;
}