/*
  Warnings:

  - A unique constraint covering the columns `[urlId]` on the table `Visitor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Visitor_urlId_key" ON "Visitor"("urlId");
