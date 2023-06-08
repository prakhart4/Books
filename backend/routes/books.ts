import express from "express";
import {
  buyBook,
  createBook,
  deleteAllBooks,
  getBook,
  getBooks,
} from "../controllers/books";
import { authenticateToken } from "../controllers/middleware";

export const bookRouter = express.Router();

//get all books
bookRouter.get("/", getBooks);

//create books
bookRouter.post("/createBooks", createBook);

//get book by id
bookRouter.get("/:id", getBook);

//buy book
bookRouter.post("/buy", authenticateToken, buyBook);

//delete all users
bookRouter.delete("/deleteAll", deleteAllBooks); //todo remove
