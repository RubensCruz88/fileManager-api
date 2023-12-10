/*
  Warnings:

  - You are about to drop the column `category_id` on the `files` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_category_id_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "category_id",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
