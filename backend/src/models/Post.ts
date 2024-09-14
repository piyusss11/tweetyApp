import mongoose, { Schema, Document, Types } from "mongoose";

// Update the interface to use ObjectId for user and likes
interface Ipost extends Document {
  user: Types.ObjectId; // User is referenced by ObjectId
  content: string;
  likes: Types.ObjectId[]; // Likes will be an array of ObjectIds
}

// Define the schema with proper types
const postSchema: Schema<Ipost> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of User ObjectIds
  },
  { timestamps: true }
);

// Create and export the Post model
const PostModel = mongoose.model<Ipost>("Post", postSchema);
export default PostModel;
