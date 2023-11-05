import express from "express";
import myDB from "../db/MyDBRecipe.js";

let router = express.Router();

router.get("/", async (req, res) => {
  const result = await myDB.getRecipes();
  if (result.error) {
    return res.status(501).json(result);
  }
  res.json(result);
});

router.post("/", async (req, res) => {
  const result = await myDB.createRecipe(req.body);
  console.log(result);
  if (result.error) {
    return res.status(503).json(result);
  }
  res.json(result);
});

export default router;
