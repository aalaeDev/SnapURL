/*
  Warnings:

  - Made the column `urlId` on table `Visitor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_urlId_fkey";

-- AlterTable
ALTER TABLE "Visitor" ALTER COLUMN "ip" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "isp" DROP NOT NULL,
ALTER COLUMN "urlId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
