-- CreateEnum
CREATE TYPE "public"."DoctorStatus" AS ENUM ('DUTY', 'LEAVE');

-- CreateEnum
CREATE TYPE "public"."Specialization" AS ENUM ('CONSULTANT_SURGEON', 'DERMATOLOGIST', 'GENERAL_PHYSICIAN', 'PEDIATRICIAN');

-- CreateTable
CREATE TABLE "public"."Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "specialization" "public"."Specialization" NOT NULL,
    "availableTime" TEXT NOT NULL,
    "status" "public"."DoctorStatus" NOT NULL DEFAULT 'DUTY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "public"."Doctor"("email");
