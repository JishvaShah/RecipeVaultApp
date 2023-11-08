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
      
      console.log(userID);
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
      console.log(recipe);
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
      console.log(updatedRecipe);
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

  // myDB.getSavedRecipeId = async function (userId) {
  //   const { client, db } = await connect();
  //   const userCollection = db.collection("Users");
  //   try {
  //     const user = await userCollection.findOne({ _id: new ObjectId(userId) });
  //     if (!user) {
  //       return { error: true, message: "User does not exist!" };
  //     }
  //     return {
  //       message: "Saved recipe IDs received successfully.",
  //       data: user.savedRecipes,
  //       error: false,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     return {
  //       error: true,
  //       message: "Some unknown error occurred. Try again!",
  //     };
  //   } finally {
  //     await client.close();
  //   }
  // };

  // myDB.getRecipesByUserId = async function (userId) {
  //   const { client, db } = await connect();
  //   const recipeCollection = db.collection("Recipes");
  //   try {
  //     const recipes = await recipeCollection.find({ userOwner: userId }).toArray();
  //     return {
  //       message: "Recipes received successfully.",
  //       data: recipes,
  //       error: false,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //     return { error: true, message: "Some unknown error occurred. Try again!" };
  //   } finally {
  //     await client.close();
  //   }
  // };

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
