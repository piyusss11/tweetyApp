import { Router } from "express";
import UserModel from "../models/User";


const router = Router();

router.post("/register", async (req, res) => {
  const { name, username, email, password } = req.body;
  const checkUser = await UserModel.findOne({ email });
  if(checkUser){
    res.status(400).send("User already exists");
  }else{
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, username, email, password });
  }
});
