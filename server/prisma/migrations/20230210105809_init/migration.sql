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
    `bookingId` VARCHAR(191) NOT NULL,
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
CREATE TABLE `RoomBooking` (
    `bookingId` VARCHAR(191) NOT NULL,
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

-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'staff', 'user') NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
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
    `role` ENUM('admin', 'staff', 'user') NOT NULL DEFAULT 'user',

    UNIQUE INDEX `Profile_email_key`(`email`),
    PRIMARY KEY (`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `token` VARCHAR(191) NOT NULL,
    `bookerId` INTEGER NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `type` ENUM('room', 'cottage') NOT NULL,
    `status` ENUM('pending', 'verified', 'expired') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Token_bookingId_key`(`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CottageBooking` ADD CONSTRAINT `CottageBooking_cottageName_fkey` FOREIGN KEY (`cottageName`) REFERENCES `Cottage`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CottageBooking` ADD CONSTRAINT `CottageBooking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomBooking` ADD CONSTRAINT `RoomBooking_roomNumber_fkey` FOREIGN KEY (`roomNumber`) REFERENCES `Room`(`roomNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomBooking` ADD CONSTRAINT `RoomBooking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`profileId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_bookerId_fkey` FOREIGN KEY (`bookerId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
