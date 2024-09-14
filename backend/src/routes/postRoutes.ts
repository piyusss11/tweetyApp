import { Router } from "express";
import PostModel from "../models/Post";
import authMiddleware from "../middlewares/authMiddleware";
import { AuthenticatedRequest } from "../types/authenticatedRequest";
import UserModel from "../models/User";

const router = Router();

router.post("/posts", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
      const { content } = req.body;
      const userId = req.user?.email as string;
  
      // Ensure email is a string and not undefined
      if (typeof userId !== 'string') {
        return res.status(400).send({ message: "User email is missing or invalid" });
      }
  
      // Find the user by email
      const user = await UserModel.findOne({ email: userId });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Create and save a new post
      const newPost = new PostModel({
        user: user._id, // Use user ID, not email
        content,
        likes: [],
      });
      await newPost.save();
  
      // Update user's posts
      user.posts.push(newPost._id as string); ;
      await user.save();
  
      // Redirect to profile page
      return res.redirect("/profile");
    } catch (error) {
      console.error("Error while creating post:", error); // Log detailed error
      return res.status(500).send({ message: "Server error" });
    }
  });
  
export default router;
