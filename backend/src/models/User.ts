import mongoose, { Schema } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  posts: string[];
}

// Define the user schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    email: { type: String, required: true, unique: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

// Create and export the user model
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
