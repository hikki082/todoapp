import express from "express";
import { router } from "./routes/routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoDbUrl = process.env.MONGODB_URL;

if (!mongoDbUrl) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

mongoose.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any);

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to the database: ", error);
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

app.use("/", router);

app.listen(8080, () => {
  console.log("Server is rocking at 8080");
});
