import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "./config/passportConfing.js";

dotenv.config({
  path: "./.env",
});

//listen app
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Database connection frild`, error);
  });
