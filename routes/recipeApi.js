import express from "express";
import myDB from "../db/MyDBRecipe.js";

let router = express.Router();

router.get("/get-recipe", async (req, res) => {
  const result = await myDB.getRecipes();
  if (result.error) {
    return res.status(501).json(result);
  }
  res.json(result);
});


//creating and inserting new recipe
router.post("/create-recipe", async (req, res) => {
  const result = await myDB.createRecipe(req.body);
  console.log(result);
  if (result.error) {
    return res.status(503).json(result);
  }
  res.json(result);
});


//getting all recipe IDs that a user has liked or saved. (Favourites Page)
router.get("/liked-recipe/ids", async (req,res) => {
  const { userId } = req.body; 
  const result = await myDB.getSavedRecipeIds(userId);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

//getting all recipes based on the user ID. (My Recipes Page)
router.get("/user-recipes", async (req, res) => {
  const { userId } = req.query; // Use query parameters to get the user ID
  const result = await myDB.getRecipesByUserId(userId);
  if (result.error) {
    return res.status(403).json(result);
  }
  res.json(result);
});

export default router;
