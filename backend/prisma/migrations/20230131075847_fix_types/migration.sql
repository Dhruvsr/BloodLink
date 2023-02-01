/*
  Warnings:

  - The `travelHistory` column on the `Donor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `drugUseHistory` column on the `Donor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "travelHistory",
ADD COLUMN     "travelHistory" TEXT[],
DROP COLUMN "drugUseHistory",
ADD COLUMN     "drugUseHistory" TEXT[];
