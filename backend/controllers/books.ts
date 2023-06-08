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

//buy book
export const buyBook: RequestHandler = async (req, res) => {
  if (req.body.bookId === undefined) {
    res.status(400).json({ message: "Missing bookId" });
  }

  try {
    //fetch book
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(req.body.bookId),
      },
    });
    if (!book) {
      res.status(400).json({ message: "Book not found" });
      return;
    }
    const price = book.point;
    //check if user has enough credit
    const preUser = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });

    if ((preUser?.credit ?? 0) < price) {
      res.status(400).json({ message: "Not enough credit" });
      return;
    }

    const user = await prisma.user.update({
      where: {
        id: req.body.userId,
      },
      data: {
        credit: { decrement: price },
        ownedBooks: { connect: { id: book.id } },
        Order: { create: { bookId: book.id, point: book.point } },
      },
      include: { ownedBooks: true, Order: true },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
