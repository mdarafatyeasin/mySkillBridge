/*
  Warnings:

  - A unique constraint covering the columns `[time_slot]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Booking_time_slot_key" ON "Booking"("time_slot");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_time_slot_fkey" FOREIGN KEY ("time_slot") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
