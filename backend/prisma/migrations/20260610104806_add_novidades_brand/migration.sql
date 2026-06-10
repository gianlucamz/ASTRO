-- AlterTable
ALTER TABLE `Product` ADD COLUMN `brand` VARCHAR(191) NULL,
    ADD COLUMN `novidades` BOOLEAN NOT NULL DEFAULT false;