import { MongoClient, ObjectId } from "mongodb";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = "mongodb://127.0.0.1:27017";

  async function connect() {
    const client = new MongoClient(uri, {});
    await client.connect();
    const db = client.db("RecipeVault");
    return { client, db };
  }

  myDB.getRecipes = async function (userID) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    try {
      const recipes = await recipeCollection
        .find({ userOwner: userID })
        .toArray();

      return {
        message: "Recipes received successfully.",
        data: recipes,
        error: false,
      };
    } catch (err) {
      console.log(err);
      return { error: true, message: "Some unknown error occured. Try Again!" };
    } finally {
      await client.close();
    }
  };

  myDB.createRecipe = async function (recipe, userId) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    const redisClient = createClient();
  
    try {
      
      const newRecipe = await recipeCollection.insertOne(recipe);
  
      await redisClient.connect();
      console.log("Redis connected");
  
      const userRecentRecipesKey = `recent_recipes:${userId}`;
      await redisClient.LPUSH(userRecentRecipesKey, newRecipe.insertedId.toString());
  
      await redisClient.LTRIM(userRecentRecipesKey, 0, 4);
  
      return {
        message: "Recipe created Successfully!",
        recipe: newRecipe,
        error: false,
      };
    } catch (err) {
      console.log(err);
      return {
        error: true,
        message: "Some unknown error occurred. Try Again!",
      };
    } finally {
      await client.close();
      await redisClient.quit();
    }
  };
  

  myDB.updateLikedRecipes = async function (recipeId, userId, isLiked) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");

    try {
      const updatedRecipe = await recipeCollection.findOneAndUpdate(
        { _id: new ObjectId(recipeId), userOwner: userId },
        { $set: { isLiked: isLiked } },
        { returnOriginal: false }
      );

      if (!updatedRecipe) {
        throw new Error("Recipe not found or unauthorized");
      }
      return {
        message: "Recipe liked status updated successfully",
        recipe: updatedRecipe.value,
        error: false,
      };
    } catch (err) {
      console.log(err);
      return { error: true, message: err.message };
    } finally {
      await client.close();
    }
  };

  myDB.getRecipeById = async function (recipeId) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    try {
      const recipe = await recipeCollection.findOne({
        _id: new ObjectId(recipeId),
      });
      return recipe;
    } catch (err) {
      console.log(err);
      return null; 
    } finally {
      await client.close();
    }
  };

  myDB.deleteRecipe = async function (recipeId) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    try {
      const result = await recipeCollection.deleteOne({
        _id: new ObjectId(recipeId),
      });
      if (result.deletedCount === 0) {
        throw new Error("Recipe not found or unauthorized");
      }
    } catch (err) {
      console.log(err);
      throw err; 
    } finally {
      await client.close();
    }
  };

  myDB.getRecentRecipesFromRedis = async function (userID) {
    const redisClient = createClient();
  
    try {
      await redisClient.connect();
      const userRecentRecipesKey = `recent_recipes:${userID}`;
      const recentRecipeIds = await redisClient.LRANGE(userRecentRecipesKey, 0, -1);
  
      const recentRecipes = [];
      for (const recipeId of recentRecipeIds) {
        const recipe = await myDB.getRecipeById(recipeId);
        if (recipe) {
          recentRecipes.push(recipe);
        }
      }
  
      return {
        message: "Recent recipes received successfully from Redis.",
        data: recentRecipes,
        error: false,
      };
    } catch (err) {
      console.error(err);
      return {
        error: true,
        message: "Some unknown error occurred. Try Again!",
      };
    } finally {
      await redisClient.quit();
    }
  };

  return myDB;
}

const myDB = MyMongoDB();
export default myDB;
