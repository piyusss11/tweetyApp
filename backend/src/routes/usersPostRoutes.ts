import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { AuthenticatedRequest } from "../types/authenticatedRequest";
import PostModel from "../models/Post";

const router = Router();

// Route to get all posts by the authenticated user
router.get("/user/posts", authMiddleware, async (req: AuthenticatedRequest, res) => {
  try {
    // Extract the user ID from the authenticated request
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(400).send({ message: "User ID is missing" });
    }

    // Fetch posts for the user and populate the user field if needed
    const posts = await PostModel.find({ user: userId }).populate("user");

    // Respond with the posts
    return res.status(200).json(posts);
  } catch (error) {
    // Log and handle the error
    console.error("Error while fetching posts:", error);
    return res.status(500).send({ message: "Server error" });
  }
});

export default router;
