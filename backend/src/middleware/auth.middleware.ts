import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtUserPayload } from "../lib/jtw";

// Extend Request type to include user info
export interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

/** Basic authentication: verify token and attach user info to req.user */
export function authRequired(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not provided. Please log in first." });
  }

  const token = authHeader.slice(7); // remove "Bearer "
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Invalid or expired token.", error: err?.message || err });
  }
}

/** Admin-only access */
export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin privileges required." });
  }
  next();
}

/** Access allowed for self or admin only (default compares params.id) */
export function selfOrAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const userId = Number(req.params.id);
  const isSelf = req.user?.id === userId;
  const isAdmin = req.user?.role === "admin";

  if (!isSelf && !isAdmin) {
    return res.status(403).json({ message: "Access denied: self or admin only." });
  }
  next();
}