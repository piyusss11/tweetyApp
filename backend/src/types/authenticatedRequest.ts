import { Request } from "express";

// Define the custom request interface
export interface AuthenticatedRequest extends Request {
  user?: {
    user_id: string;
    email: string;
  };
}