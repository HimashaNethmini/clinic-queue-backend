/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Appointment_doctorId_date_idx";

-- DropIndex
DROP INDEX "public"."Appointment_doctorId_tokenNumber_date_key";

-- AlterTable
ALTER TABLE "public"."Appointment" DROP COLUMN "date",
ADD COLUMN     "appointmentDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Appointment_doctorId_appointmentDate_idx" ON "public"."Appointment"("doctorId", "appointmentDate");
