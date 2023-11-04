import express from "express";
let router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import myDB from "../db/MyDBUsers.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Username and Password: ", username, password);
  const user = await myDB.register(username, password);
  res.json(user);
});

router.post("/login", async (req, res) => {
  res.json(["A", 1, "B", 2]);
});

export default router;
