import { MongoClient } from "mongodb";
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

  myDB.getRecipes = async function () {
    const { client, db } = await connect();
    const recipeCollection = db.collection("Recipes");
    try {
      const recipes = await recipeCollection.find({}).toArray();
      return {
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
  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
