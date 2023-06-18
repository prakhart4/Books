import { RequestHandler } from "express";
import { prisma } from "../app";
import { get } from "http";

//add books
export const createBook: RequestHandler = async (req, res) => {
  const book = await prisma.book.createMany({
    data: req.body,
  });

  res.json(book);
};

//get all books
export const getBooks: RequestHandler = async (req, res) => {
  //get courser
  const cursor = parseInt(req.query?.cursor?.toString() ?? "");
  const category = req.query?.category?.toString();

  const getCate = () => {
    switch (category) {
      case "fiction":
        return "fiction";
      case "nonFiction":
        return "nonFiction";
      case "science":
        return "science";
      case "essay":
        return "essay";
      default:
        return undefined;
    }
  };

  const enuCategory = getCate();

  const books = await prisma.book.findMany({
    take: 5,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    ...(enuCategory
      ? {
          where: {
            tag: enuCategory,
          },
        }
      : {}),
  });

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
  //get api key from header
  const apiKey = req.headers["x-api-key"];

  //check if api key is valid
  if (apiKey !== process.env.SECRET) {
    //delete all books
    res.status(401).json({ message: "Unauthorized" });
  }
  try {
    await prisma.book.deleteMany();
    res.json({ message: "All books deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

//search all books
export const searchBooks: RequestHandler = async (req, res) => {
  console.log(req.query.query);
  //check if query is empty

  if (req.query?.query === undefined) {
    res.status(400).json({ message: "Missing query" });
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        title: { search: req.query.query?.toString() },
      },
    });
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
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
      include: {
        ownedBooks: true,
      },
    });

    if ((preUser?.credit ?? 0) < price) {
      res.status(400).json({ message: "Not enough credit" });
      return;
    }

    //check if user already own book
    if (
      preUser?.ownedBooks.some((ownedBook: any) => ownedBook.id === book.id)
    ) {
      res.status(400).json({ message: "User already owns this book" });
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
