/*
  Warnings:

  - You are about to drop the column `urlCode` on the `Visitor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_urlCode_fkey";

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "urlCode",
ADD COLUMN     "urlId" TEXT;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE SET NULL ON UPDATE CASCADE;
