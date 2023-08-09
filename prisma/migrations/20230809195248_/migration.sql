/*
  Warnings:

  - You are about to drop the column `urlAnalyticId` on the `Visitor` table. All the data in the column will be lost.
  - You are about to drop the `UrlAnalytic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UrlAnalytic" DROP CONSTRAINT "UrlAnalytic_url_id_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_urlAnalyticId_fkey";

-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "urlAnalyticId",
ADD COLUMN     "urlId" TEXT;

-- DropTable
DROP TABLE "UrlAnalytic";

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE SET NULL ON UPDATE CASCADE;
