/*
  Warnings:

  - You are about to alter the column `point` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Changed the type of `tag` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "tag" AS ENUM ('fiction', 'nonFiction', 'science', 'essay');

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "point" SET DATA TYPE INTEGER,
DROP COLUMN "tag",
ADD COLUMN     "tag" "tag" NOT NULL;

-- DropEnum
DROP TYPE "tags";
