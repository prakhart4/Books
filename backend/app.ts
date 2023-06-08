import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routes/users";
import { bookRouter } from "./routes/books";
export const prisma = new PrismaClient();

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
  app.use("/api/user", userRouter);
  app.use("/api/book", bookRouter);

  // app.get("/", async (req, res) => {
  //   res.send("Hello, Express!");
  // });

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

// export const prismaClient = prisma;
