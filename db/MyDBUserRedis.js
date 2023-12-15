import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

let client = null;

// Replace the following with your connection URI
const REDIS_URI = process.env.REDIS_URI || "redis://127.0.0.1:6379";

export async function getKey(key) {
  try {
    client = redis.createClient({
      url: REDIS_URI,
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("connect", () => console.log("Connected to Redis"));
    // Connect to Redis
    client.connect();
    const value = await client.get(key);
    return value;
  } catch (err) {
    console.error(err);
  } finally {
    client.quit();
  }
}

export async function setKeyVal(key, val) {
  try {
    client = redis.createClient({
      url: REDIS_URI,
    });
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.on("connect", () => console.log("Connected to Redis"));
    // Connect to Redis
    client.connect();
    const value = await client.set(key, val);
    return value;
  } catch (err) {
    console.error(err);
  } finally {
    client.quit();
  }
}
