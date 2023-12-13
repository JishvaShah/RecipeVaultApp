import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import myDB from "../db/MyDBUsers.js";
import passport from "passport";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

let router = express.Router();
dotenv.config();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const result = await myDB.register(email, password);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

/* POST login. */
router.post("/login", function (req, res) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({
        message: "User Logged In successfully!",
        userID: user._id,
        token,
        error: false,
      });
    });
  })(req, res);
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
