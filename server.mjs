import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { router } from "./pathRoutes.js";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!. SHUTTING DOWN");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = express();

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTION SUCCESSFUL");
  });

const port = 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}!!`);
});

app.use(bodyParser.json());
app.use("/api/v1/excel", router);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDELED REJECTION . SHUTTING DOWN");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
