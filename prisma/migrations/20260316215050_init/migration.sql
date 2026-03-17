-- CreateEnum
CREATE TYPE "PARKINGSPOTSTATUS" AS ENUM ('LIVRE', 'OCUPADO');

-- CreateTable
CREATE TABLE "tbl_admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_parking_spots" (
    "id" SERIAL NOT NULL,
    "spot_status" "PARKINGSPOTSTATUS" NOT NULL DEFAULT 'LIVRE',
    "spot_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_parking_spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_parking_tickets" (
    "id" SERIAL NOT NULL,
    "car_plate" TEXT NOT NULL,
    "check_in_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_out_time" TIMESTAMP(3),
    "total_price" INTEGER,
    "id_spot_fk" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_parking_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_admin_email_key" ON "tbl_admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_admin_username_key" ON "tbl_admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_parking_spots_spot_number_key" ON "tbl_parking_spots"("spot_number");

-- CreateIndex
CREATE INDEX "tbl_parking_spots_spot_status_idx" ON "tbl_parking_spots"("spot_status");

-- AddForeignKey
ALTER TABLE "tbl_parking_tickets" ADD CONSTRAINT "tbl_parking_tickets_id_spot_fk_fkey" FOREIGN KEY ("id_spot_fk") REFERENCES "tbl_parking_spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
