import dotenv from "dotenv";
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const SECRET_KEY = process.env.SECRET_KEY;

export const EXPIRATION_TIME = process.env.EXPIRATION_TIME;

export const FRONTEND_URL = process.env.FRONTEND_URL;
