import express from "express";
import { login, register, me } from "../controller/auth.controller";
import { authRequired } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authRequired, me);

export default router;