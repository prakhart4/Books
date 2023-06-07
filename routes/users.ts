import { authenticateToken } from "../controllers/middleware";
import {
  deleteAllUsers,
  getUser,
  signInUser,
  signupUser,
} from "../controllers/users";

import express from "express";

export const userRouter = express.Router();

//get userDetails
userRouter.get("/", authenticateToken, getUser);

//sign up
userRouter.post("/signup", signupUser);

//sign in
userRouter.post("/signIn", signInUser);

//delete all users
userRouter.delete("/deleteAll", deleteAllUsers); //todo remove
