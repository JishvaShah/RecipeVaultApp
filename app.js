import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import userRouter from "./routes/userApi.js";
import recipeRouter from "./routes/recipeApi.js";
import { fileURLToPath } from "url";

//ES6 modules don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));
app.use("/api/user", userRouter);
app.use("/api/recipe", recipeRouter);

export default app;
