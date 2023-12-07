//passport.js
import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "./db/MyDBUsers.js";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      try {
        const user = await myDB.findByUsernameAndPassword({ email, password });
        if (!user || user.error) {
          return cb(null, false, { message: "Incorrect email or password." });
        }

        return cb(null, user, { message: "Logged In Successfully" });
      } catch (err) {
        return cb(err);
      }
    }
  )
);
