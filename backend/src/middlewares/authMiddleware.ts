import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Request interface within the file
interface AuthenticatedRequest extends Request {
  user?: string | object;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Token missing" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded; // Attach the decoded token to the request
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid Token" });
  }
};

export default authMiddleware;
