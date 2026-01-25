import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import commentRoutes from './routes/commentRoutes.js'
// import { checkForAuthentication } from "./middlewares/authMiddleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("MiniBlog API running");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'internal server error'
  res.status(statusCode).json({ 
    success: false,
    message,
    statusCode
  });
})