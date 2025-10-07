import express from "express";
import { authRequired,adminOnly, selfOrAdmin  } from "../middleware/auth.middleware";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "../controller/usr.controller";

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUser);

// after you login then you can make
router.post("/", adminOnly, authRequired, createUser);
router.put("/:id", selfOrAdmin,authRequired, updateUser);
router.delete("/:id", authRequired,authRequired, deleteUser);
router.delete("/:id", authRequired,selfOrAdmin, deleteUser);
export default router;