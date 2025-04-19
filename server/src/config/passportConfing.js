import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: `User Not Found` });
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: `Incorrect password` });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("We are inside serializUser");
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  try {
    console.log("We are inside deserializeUser");
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
