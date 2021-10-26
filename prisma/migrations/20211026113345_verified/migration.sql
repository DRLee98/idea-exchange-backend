/*
  Warnings:

  - You are about to drop the column `verification` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tel]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verification",
ALTER COLUMN "permissionLevel" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "tel" INTEGER,
    "email" TEXT,
    "code" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_tel_key" ON "Verification"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_email_key" ON "Verification"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tel_key" ON "User"("tel");
