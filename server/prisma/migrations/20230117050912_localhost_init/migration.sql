/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_roomNumber_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_bookingId_fkey`;

-- AlterTable
ALTER TABLE `Token` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` ENUM('pending', 'verified', 'expired') NOT NULL DEFAULT 'pending',
    ADD COLUMN `type` ENUM('room', 'cottage') NOT NULL;

-- DropTable
DROP TABLE `Booking`;

-- CreateTable
CREATE TABLE `Cottage` (
    `cottageId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Cottage_name_key`(`name`),
    PRIMARY KEY (`cottageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CottageBooking` (
    `bookingId` INTEGER NOT NULL AUTO_INCREMENT,
    `cottageName` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `checkin` DATE NOT NULL,
    `checkout` DATE NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('pending', 'verified', 'canceled') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomBooking` (
    `bookingId` INTEGER NOT NULL AUTO_INCREMENT,
    `roomNumber` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `checkin` DATE NOT NULL,
    `checkout` DATE NOT NULL,
    `adults` INTEGER NOT NULL DEFAULT 1,
    `kids` INTEGER NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('pending', 'verified', 'canceled') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_email_key` ON `Admin`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Admin_password_key` ON `Admin`(`password`);

-- AddForeignKey
ALTER TABLE `CottageBooking` ADD CONSTRAINT `CottageBooking_cottageName_fkey` FOREIGN KEY (`cottageName`) REFERENCES `Cottage`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CottageBooking` ADD CONSTRAINT `CottageBooking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomBooking` ADD CONSTRAINT `RoomBooking_roomNumber_fkey` FOREIGN KEY (`roomNumber`) REFERENCES `Room`(`roomNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomBooking` ADD CONSTRAINT `RoomBooking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
