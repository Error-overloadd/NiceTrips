import express from "express";
import type { Request, Response } from "express";
// 🧩 导入路由
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes"
import { assertDB } from "./lib/db.js";
// Create a new express application instance
const app = express();

// Set the network port
const port = Number(process.env.PORT ?? 3000);
app.use(express.json())
// Define the root path with a greeting message
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Start the Express server
app.listen(port, async () => {
  try {
    await assertDB();
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
  console.log(`The server is running at http://localhost:${port}`);
});
