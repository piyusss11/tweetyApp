import cookieParser from "cookie-parser";
import express from "express";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import userPostRoutes from "./routes/usersPostRoutes";
// import PostModel from "./models/Post";
import cors from "cors";
// import authMiddleware from "./middlewares/authMiddleware";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(authMiddleware)
app.use('/api/users', userRoutes); // Set up routes
app.use('/api', postRoutes);
app.use('/api', userPostRoutes);

export default app;
