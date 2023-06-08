import express from "express";
import {
  createBook,
  deleteAllBooks,
  getBook,
  getBooks,
} from "../controllers/books";

export const bookRouter = express.Router();

//get userDetails
bookRouter.get("/", getBooks);

//sign up
bookRouter.post("/createBook", createBook);

//sign in
bookRouter.get("/:id", getBook);

//delete all users
bookRouter.delete("/deleteAll", deleteAllBooks); //todo remove
