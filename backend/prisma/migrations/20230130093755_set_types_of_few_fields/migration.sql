/*
  Warnings:

  - The `medicationsCurrentlyTaking` column on the `Donor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `allergies` column on the `Donor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Donor" DROP COLUMN "medicationsCurrentlyTaking",
ADD COLUMN     "medicationsCurrentlyTaking" TEXT[],
DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[];
