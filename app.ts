import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const app = express();
  const port = 3000;

  //middleware
  app.use(express.json());

  //cors policy
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  //logging
  app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

  //routes
  app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
  });

  app.get("/", async (req, res) => {
    res.send("Hello, Express!");
  });

  //start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
