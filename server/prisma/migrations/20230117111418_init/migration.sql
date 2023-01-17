/*
  Warnings:

  - The values [superAdmin] on the enum `Profile_role` will be removed. If these variants are still used in the database, this will fail.
  - The values [superAdmin] on the enum `Profile_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `role` ENUM('admin', 'staff', 'user') NOT NULL;

-- AlterTable
ALTER TABLE `Profile` MODIFY `role` ENUM('admin', 'staff', 'user') NOT NULL DEFAULT 'user';
