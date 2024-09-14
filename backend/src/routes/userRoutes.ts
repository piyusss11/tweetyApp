import { Router } from "express";
import UserModel from "../models/User";
// import PostModel from "../models/Post";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import authMiddleware from "../middlewares/authMiddleware";


const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if the user already exists
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Respond with success
    // return res.status(201).json({ message: "User created successfully", user });
    // alert("User created successfully");
    return res.redirect("/login");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // return res.status(200).json({ message: "Login successful", user });
      // Generate a JWT
      const token = jwt.sign(
        { user_id: user._id, email: email },
        process.env.SECRET_KEY as string
      );
      // Set the JWT in a cookie
      res.cookie("token", token);
      return res.redirect("/profile");
    } else {
      // Passwords do not match
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// router.get("/profile",authMiddleware, (req, res) => {
//  console.log("its profile page")
  
// })

export default router;
