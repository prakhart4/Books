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

//delete all user
export const deleteAllUsers: RequestHandler = async (req, res) => {
  const users = await prisma.user.deleteMany();
  res.json(users);
};
