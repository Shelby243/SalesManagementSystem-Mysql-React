import { config } from "dotenv";
import express from "express";
import dotenv from "dotenv";
import pkg from "body-parser";
import db from "./config/db.js";
import router from "./routes/userRoutes.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

dotenv.config();
const PORT = 4000;

app.use(pkg.json());
app.use(pkg.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `server Running in developement Mode on port ${process.env.PORT}`
  );
});
