/*
  Warnings:

  - You are about to drop the column `donorId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_donorId_key";

-- DropIndex
DROP INDEX "User_patientId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "donorId",
DROP COLUMN "patientId";
