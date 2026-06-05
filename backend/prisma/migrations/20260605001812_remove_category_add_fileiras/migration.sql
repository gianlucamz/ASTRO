/*
  Warnings:

  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropIndex
DROP INDEX `Product_categoryId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryId`,
    ADD COLUMN `computadores` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `destaques` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `diversos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `games` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hardware` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `perifericos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `promocoes` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `smartphones` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `category`;
