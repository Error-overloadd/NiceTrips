import { Request, Response } from "express";
import { User } from "../models/user.model";
import { signAccessToken } from "../lib/jtw";
import { AuthRequest } from "../middleware/auth.middleware";

// register 
export async function register(req: Request, res: Response) {
  try {
    const { Username, Email_Address, Postal_Address, Mobile_Number, password } = req.body;

    if (!Username || !Email_Address || !password) {
      return res.status(400).json({ message: "Need: Username、Email_Address、password" });
    }

    const existed = await User.findOne({ where: { Email_Address } });
    if (existed) return res.status(400).json({ message: "User other email " });

    const user = await User.create({
      Username,
      Email_Address,
      Postal_Address,
      Mobile_Number,
      password,
      Role: "user",
    } as any);

    const safe = user.toJSON() as any;
    delete safe.passwordHash;

    const token = signAccessToken({
      id: user.User_ID,
      email: user.Email_Address,
      username: user.Username,
      role:user.Role as "user" | "admin",
    });

    return res.status(201).json({ message: "register sucessful", data: safe, token });
  } catch (err: any) {
    return res.status(500).json({ message: "register failure", error: err?.message || err });
  }
}

/** Login */
export async function login(req: Request, res: Response) {
  try {
    const { Email_Address, password } = req.body;

    if (!Email_Address || !password) {
      return res.status(400).json({ message: "Need: Email_Address  password " });
    }

    const user = await User.findOne({ where: { Email_Address } });
    if (!user) return res.status(401).json({ message: "wrong email or password" });

    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ message: "wrong email or password" });

    const token = signAccessToken({
      id: user.User_ID,
      email: user.Email_Address,
      username: user.Username,
        role:user.Role as "user" | "admin"
    });

    const safe = user.toJSON() as any;
    delete safe.passwordHash;

    return res.json({ message: "Login successful", data: safe, token });
  } catch (err: any) {
    return res.status(500).json({ message: "Login fail", error: err?.message || err });
  }
}

/** 已登录用户信息 */
export async function me(req: AuthRequest, res: Response) {
  try {
    // 你的 payload 里放的是 { id, email, username }
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Need login " });

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["passwordHash"] },
    });
    if (!user) return res.status(404).json({ message: "User doesnt exits" });

    return res.json({ message: "OK", data: user });
  } catch (err: any) {
    return res.status(500).json({ message: "fail to get info", error: err?.message || err });
  }
}