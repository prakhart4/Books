import { RequestHandler } from "express";
import { prisma } from "../app";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get user by id
export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  //check if user exists
  if (!userId) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  //find user
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      ownedBooks: true,
      Order: true,
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  // Remove the password field from the user object
  const { password, ...rest } = user;

  res.json(rest);
};

//signup
export const signupUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  //check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if user exists
    const checkUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (checkUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    //create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        credit: 100,
      },
      include: {
        ownedBooks: true,
        Order: true,
      },
    });

    //generate a JWT
    const token = jwt.sign({ userId: user.id }, process.env.SECRET!, {
      expiresIn: "3d",
    });

    //return email and token
    res.status(201).json({
      user,
      token,
    });
  } catch (error: any) {
    //return error
    console.log(error);
    res.status(500).json({ message: "Registration failed", error: error });
  }
};

//signIn
export const signInUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  //check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    //find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        ownedBooks: true,
        Order: true,
      },
    });

    //check if user exists
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //generate a JWT
    const token = jwt.sign({ userId: user.id }, process.env.SECRET!, {
      expiresIn: "3d",
    });

    //remove password from response
    const { password: _, ...rest } = user;

    //return token
    res.json({ user: rest, token });
  } catch (error) {
    //return error
    res.status(500).json({ message: "Login failed", error });
  }
};

//get Orders
export const getOrders: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  //check if user exists
  if (!userId) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  //find user
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      book: true,
    },
  });

  if (!orders) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  res.json(orders);
};

//Cancel Order
export const cancelOrder: RequestHandler = async (req, res) => {
  const { userId } = req.body;
  const { orderId } = req.params;

  //check if user exists
  if (!orderId || !userId) {
    return res.status(400).json({
      message: "id not found",
    });
  }

  //find user
  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(orderId),
    },
  });

  if (!order) {
    return res.status(400).json({
      message: "Order not found",
    });
  }

  //check if user is owner of order
  if (order.userId !== userId) {
    return res.status(400).json({
      message: "User is not owner of this order",
    });
  }

  //update user credit and remove book
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      credit: {
        increment: order.point,
      },
      ownedBooks: {
        disconnect: {
          id: order.bookId,
        },
      },
    },
    include: {
      ownedBooks: true,
      Order: true,
    },
  });

  //delete order
  await prisma.order.delete({
    where: {
      id: parseInt(orderId),
    },
  });

  res.json(user);
};

//delete all user
export const deleteAllUsers: RequestHandler = async (req, res) => {
  //get api key from header
  const apiKey = req.headers["x-api-key"];
  //check if api key is valid
  if (apiKey !== process.env.SECRET!) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    //delete all users
    const users = await prisma.user.deleteMany();
    res.json({ message: "Delete successful", users });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
