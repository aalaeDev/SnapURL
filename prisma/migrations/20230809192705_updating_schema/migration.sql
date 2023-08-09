-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "urlCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UrlAnalytic" (
    "id" TEXT NOT NULL,
    "url_id" TEXT NOT NULL,
    "clicked" INTEGER NOT NULL,

    CONSTRAINT "UrlAnalytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IpAdress" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isp" TEXT NOT NULL,
    "urlAnalyticId" TEXT,

    CONSTRAINT "IpAdress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_urlCode_key" ON "Url"("urlCode");

-- CreateIndex
CREATE UNIQUE INDEX "UrlAnalytic_url_id_key" ON "UrlAnalytic"("url_id");

-- AddForeignKey
ALTER TABLE "UrlAnalytic" ADD CONSTRAINT "UrlAnalytic_url_id_fkey" FOREIGN KEY ("url_id") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpAdress" ADD CONSTRAINT "IpAdress_urlAnalyticId_fkey" FOREIGN KEY ("urlAnalyticId") REFERENCES "UrlAnalytic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
