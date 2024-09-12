import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";

const app = express();
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
