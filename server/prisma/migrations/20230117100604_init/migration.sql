/*
  Warnings:

  - Added the required column `name` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('superAdmin', 'staff', 'user') NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `role` ENUM('superAdmin', 'staff', 'user') NOT NULL DEFAULT 'user';
