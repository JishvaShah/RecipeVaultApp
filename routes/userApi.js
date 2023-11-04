import express from "express";
let router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import myDB from "../db/MyDBUsers.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const result = await myDB.register(username, password);
  res.json(result);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await myDB.login(username, password);
  res.json(result);
});

export default router;
