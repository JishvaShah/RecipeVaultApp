import express from "express";
import myDB from "../db/MyDBRecipe.js";

let router = express.Router();

router.get("/get-recipe/:userID", async (req, res) => {
  const { userID } = req.params;
  const result = await myDB.getRecipes(userID);
  if (result.error) {
    return res.status(501).json(result);
  }
  res.json(result);
});

//creating and inserting new recipe
router.post("/create-recipe", async (req, res) => {
  const result = await myDB.createRecipe(req.body);
  if (result.error) {
    return res.status(503).json(result);
  }
  res.json(result);
});

//getting all recipe IDs that a user has liked or saved. (Favourites Page)
router.post("/update-like/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const { userId, isLiked } = req.body;

  try {
    
    const result = await myDB.updateLikedRecipes(recipeId, userId, isLiked);

    res
      .status(200)
      .json({ message: "Recipe liked status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update recipe liked status" });
  }
});


router.delete("/delete-recipe/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the user is authorized to delete the recipe
    const recipe = await myDB.getRecipeById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.userOwner !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this recipe" });
    }

    // Delete the recipe
    await myDB.deleteRecipe(recipeId);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete the recipe" });

  }
});


export default router;
