import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const DB_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

//Database connection here.

export default router;
