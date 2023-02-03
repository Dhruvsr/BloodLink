-- CreateEnum
CREATE TYPE "BloodComponent" AS ENUM ('WholeBlood', 'RedBloodCells', 'Platelets', 'Plasma', 'Cryoprecipitate');

-- CreateTable
CREATE TABLE "BloodDonationNeed" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "requiredOn" TIMESTAMP(3) NOT NULL,
    "component" "BloodComponent" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "currentHealthStatus" TEXT NOT NULL,
    "letterFromDoctor" TEXT,

    CONSTRAINT "BloodDonationNeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BloodDonationNeed_id_key" ON "BloodDonationNeed"("id");

-- AddForeignKey
ALTER TABLE "BloodDonationNeed" ADD CONSTRAINT "BloodDonationNeed_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
