-- CreateTable
CREATE TABLE "BloodDonationRequest" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "availableOn" TIMESTAMP(3) NOT NULL,
    "onAlternateDay" BOOLEAN NOT NULL DEFAULT false,
    "alternateDay" TIMESTAMP(3),

    CONSTRAINT "BloodDonationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BloodDonationRequest_id_key" ON "BloodDonationRequest"("id");

-- AddForeignKey
ALTER TABLE "BloodDonationRequest" ADD CONSTRAINT "BloodDonationRequest_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
