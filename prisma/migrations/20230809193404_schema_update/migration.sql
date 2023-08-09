/*
  Warnings:

  - You are about to drop the column `clicked` on the `UrlAnalytic` table. All the data in the column will be lost.
  - You are about to drop the `IpAdress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IpAdress" DROP CONSTRAINT "IpAdress_urlAnalyticId_fkey";

-- AlterTable
ALTER TABLE "UrlAnalytic" DROP COLUMN "clicked",
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "IpAdress";

-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isp" TEXT NOT NULL,
    "urlAnalyticId" TEXT,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_urlAnalyticId_fkey" FOREIGN KEY ("urlAnalyticId") REFERENCES "UrlAnalytic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
