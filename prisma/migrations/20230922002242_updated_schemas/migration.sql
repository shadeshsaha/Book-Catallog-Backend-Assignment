/*
  Warnings:

  - You are about to drop the column `createdAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ordered-books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ordered-books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orders` table. All the data in the column will be lost.
  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `reviews-and-ratings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews-and-ratings` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Changed the type of `role` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'customer');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'shipped', 'delivered');

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ordered-books" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "updatedAt",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "reviews-and-ratings" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL;
