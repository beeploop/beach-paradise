/*
  Warnings:

  - The primary key for the `CottageBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RoomBooking` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `CottageBooking` DROP PRIMARY KEY,
    MODIFY `bookingId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`bookingId`);

-- AlterTable
ALTER TABLE `RoomBooking` DROP PRIMARY KEY,
    MODIFY `bookingId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`bookingId`);
