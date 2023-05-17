-- AlterTable
ALTER TABLE `User` ADD COLUMN `roles` ENUM('User', 'Admin') NOT NULL DEFAULT 'User';
