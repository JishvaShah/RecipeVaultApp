import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import myDB from "../db/MyDBUsers.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

let router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await myDB.register(email, password);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await myDB.login(email, password);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

router.get("/user-by-id", verifyAccessToken, async (req, res) => {
  const userId = req.userId;
  const result = await myDB.getByID(userId);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

router.put("/update-password", verifyAccessToken, async (req, res) => {
  const userId = req.userId;
  const { newPassword } = req.body;
  const result = await myDB.updatePassword(newPassword, userId);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

router.delete("/delete-user", verifyAccessToken, async (req, res) => {
  const userId = req.userId;
  const result = await myDB.deleteUser(userId);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

export default router;
