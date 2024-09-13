import cookieParser from "cookie-parser";
import express from "express";
import userRoutes from "./routes/userRoutes";
// import PostModel from "./models/Post";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoutes); // Set up routes

export default app;
