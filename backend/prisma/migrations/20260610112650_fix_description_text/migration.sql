-- AlterTable
ALTER TABLE `product` ADD COLUMN `brand` VARCHAR(191) NULL,
    MODIFY `description` TEXT NOT NULL;
