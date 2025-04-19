import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

const app = express();

// middlewares
const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//import route
import authRoute from "./routes/authRouter.js";

//use route
app.use("/api/auth", authRoute);

export { app };
