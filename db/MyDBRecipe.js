import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

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
      
      const recipes = await recipeCollection.find({userOwner: userID}).toArray();
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

  myDB.createRecipe = async function (recipe) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    try {

      const newRecipe = await recipeCollection.insertOne(recipe);
      return {
        message: "Recipe created Successfully!",
        recipe: newRecipe,
        error: false,
      };
    } catch (err) {
      console.log(err);
      return { error: true, message: "Some unknown error occured. Try Again!" };
    } finally {
      await client.close();
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
      const recipe = await recipeCollection.findOne({ _id: new ObjectId(recipeId) });
      return recipe;
    } catch (err) {
      console.log(err);
      return null; // Recipe not found or an error occurred
    } finally {
      await client.close();
    }
  };
  
  myDB.deleteRecipe = async function (recipeId) {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    try {
      const result = await recipeCollection.deleteOne({ _id: new ObjectId(recipeId) });
      if (result.deletedCount === 0) {
        throw new Error("Recipe not found or unauthorized");
      }
    } catch (err) {
      console.log(err);
      throw err; // An error occurred while deleting the recipe
    } finally {
      await client.close();
    }
  };

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
