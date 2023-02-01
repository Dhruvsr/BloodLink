/*
  Warnings:

  - You are about to drop the column `socialSecurityNumber` on the `Donor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "socialSecurityNumber",
ADD COLUMN     "aadharNumber" TEXT;
