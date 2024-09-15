import { Router } from "express";
import PostModel from "../models/Post";
import authMiddleware from "../middlewares/authMiddleware";
import { AuthenticatedRequest } from "../types/authenticatedRequest";
import UserModel from "../models/User";

const router = Router();

router.post(
  "/posts",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { content } = req.body;
      const userId = req.user?.email as string;

      // Ensure email is a string and not undefined
      if (typeof userId !== "string") {
        return res
          .status(400)
          .send({ message: "User email is missing or invalid" });
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
      user.posts.push(newPost._id as string);
      await user.save();

      // Redirect to profile page
      return res.redirect("/profile");
    } catch (error) {
      console.error("Error while creating post:", error); // Log detailed error
      return res.status(500).send({ message: "Server error" });
    }
  }
);

router.post(
  "/posts/delete",
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { postId } = req.body;
      const userId = req.user?.user_id as string;
      const post = await PostModel.findById(postId);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      if (post.user.toString() !== userId) {
        return res
          .status(403)
          .send({ message: "You are not authorized to delete this post" });
      }
      await PostModel.findByIdAndDelete(postId);
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { posts: postId },
      });
      res.status(200).send({ message: "Post deleted successfully" });
      return res.redirect("/profile");
    } catch (error) {
      res.send(error);
    }
  }
);

export default router;
