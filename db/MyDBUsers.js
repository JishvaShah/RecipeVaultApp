import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

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

  myDB.register = async function (username, password) {
    const { client, db } = await connect();
    const userCollection = db.collection("Users");
    try {
      const user = await userCollection.findOne({ username });
      if (user) {
        return { message: "User already exists!" };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userCollection.insertOne({
        username,
        password: hashedPassword,
      });
      return { message: "User Registered Successfully!", user: newUser };
    } finally {
      await client.close();
    }
  };

  myDB.login = async function (username, password) {
    const { client, db } = await connect();
    const userCollection = db.collection("Users");
    try {
      const user = await userCollection.findOne({ username });
      if (!user) {
        return { message: "User does not exists!" };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { message: "Username or password is Incorrect!" };
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return { token, userID: user._id };
    } finally {
      await client.close();
    }
  };
  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
