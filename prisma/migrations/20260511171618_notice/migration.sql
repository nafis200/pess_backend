/*
  Warnings:

  - You are about to drop the column `pdfUrl` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Notice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "pdfUrl",
DROP COLUMN "publicId";
