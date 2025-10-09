import { Request, Response } from "express";
import { User } from "../models/user.model";
import { signAccessToken } from "../lib/jtw";
import { AuthRequest } from "../middleware/auth.middleware";

// register 
export async function register(req: Request, res: Response) {
  try {
    const { Username, Email_Address, Postal_Address, Mobile_Number, password } = req.body;
    // 
    if (!Username || !Email_Address || !password) {
      return res.status(400).json({ message: "Need: Username、Email_Address、password" });
    }
    // To check uesr existed or not.
    const existed = await User.findOne({ where: { Email_Address } });
    if (existed) return res.status(400).json({ message: "User other email " });
    // create user data
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
    // check current user exist or not
    const isVailduser = await User.findOne({ where: { Email_Address } });
    if (!isVailduser) return res.status(401).json({ message: "wrong email or password" });
    //
    const isVaildpassword = await isVailduser.verifyPassword(password);
    if (!isVaildpassword) return res.status(401).json({ message: "wrong email or password" });
    // when the user login, the backend signs the accesstoken to current user.
    const token = signAccessToken({
      id: isVailduser.User_ID,
      email: isVailduser.Email_Address,
      username: isVailduser.Username,
        role:isVailduser.Role as "user" | "admin"
    });

    
    const safe = isVailduser.toJSON() as any;
    delete safe.passwordHash;

    return res.json({ message: "Login successful", data: safe, token });
  } catch (err: any) {
    return res.status(500).json({ message: "Login fail", error: err?.message || err });
  }
}

// current user 
export async function me(req: AuthRequest, res: Response) {
  try {
    //palyload:  { id, email, username }
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Need login " });
    // check the password from user database
    const isVailduser = await User.findByPk(userId, {
      attributes: { exclude: ["passwordHash"] },
    });
    if (!isVailduser) return res.status(404).json({ message: "User doesnt exits" });

    return res.json({ message: "OK", data: isVailduser });
  } catch (err: any) {
    return res.status(500).json({ message: "fail to get info", error: err?.message || err });
  }
}