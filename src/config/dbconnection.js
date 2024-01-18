import mongoose from "mongoose";
import { MONGO_URL } from "./env.js";

export default async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database MONGODB!");
  } catch (err) {
    console.log(err);
  }
};
