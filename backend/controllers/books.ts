import { RequestHandler } from "express";
import { prisma } from "../app";

//add books
export const createBook: RequestHandler = async (req, res) => {
  const book = await prisma.book.createMany({
    data: req.body,
  });

  res.json(book);
};

//get all books
export const getBooks: RequestHandler = async (req, res) => {
  const books = await prisma.book.findMany();

  res.json(books);
};

//get book by id
export const getBook: RequestHandler = async (req, res) => {
  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.json(book);
};

//delete all Books
export const deleteAllBooks: RequestHandler = async (req, res) => {
  await prisma.book.deleteMany({});

  res.json({ message: "All books deleted" });
};
