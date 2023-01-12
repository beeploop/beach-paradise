-- CreateTable
CREATE TABLE `Room` (
    `roomNumber` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('deluxe', 'suite') NOT NULL DEFAULT 'deluxe',
    `bed` INTEGER NOT NULL,
    `status` ENUM('operational', 'unoperational') NOT NULL DEFAULT 'operational',
    `price` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    PRIMARY KEY (`roomNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Booking` (
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
    UNIQUE INDEX `Booking_checkin_checkout_roomNumber_key`(`checkin`, `checkout`, `roomNumber`),
    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `profileId` INTEGER NOT NULL,
    UNIQUE INDEX `User_profileId_key`(`profileId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Profile` (
    `profileId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postal` INTEGER NOT NULL,
    UNIQUE INDEX `Profile_email_key`(`email`),
    PRIMARY KEY (`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Token` (
    `tokenId` VARCHAR(191) NOT NULL,
    `bookerId` INTEGER NOT NULL,
    `bookingId` INTEGER NOT NULL,
    UNIQUE INDEX `Token_bookingId_key`(`bookingId`),
    PRIMARY KEY (`tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- AddForeignKey
ALTER TABLE `Booking`
ADD CONSTRAINT `Booking_roomNumber_fkey` FOREIGN KEY (`roomNumber`) REFERENCES `Room`(`roomNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Booking`
ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `User`
ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`profileId`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Token`
ADD CONSTRAINT `Token_bookerId_fkey` FOREIGN KEY (`bookerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Token`
ADD CONSTRAINT `Token_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`bookingId`) ON DELETE RESTRICT ON UPDATE CASCADE;