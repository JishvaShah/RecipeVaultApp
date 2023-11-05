import express from "express";
let router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import myDB from "../db/MyDBUsers.js";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await myDB.register(email, password);
  console.log(result);
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

export default router;
