/*
  Warnings:

  - The values [WholeBlood,RedBloodCells] on the enum `BloodComponent` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodComponent_new" AS ENUM ('Whole Blood', 'Red Blood Cells', 'Platelets', 'Plasma', 'Cryoprecipitate');
ALTER TABLE "BloodDonationNeed" ALTER COLUMN "component" TYPE "BloodComponent_new" USING ("component"::text::"BloodComponent_new");
ALTER TYPE "BloodComponent" RENAME TO "BloodComponent_old";
ALTER TYPE "BloodComponent_new" RENAME TO "BloodComponent";
DROP TYPE "BloodComponent_old";
COMMIT;
