/*
  Warnings:

  - You are about to drop the column `userName` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `subject` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "userName",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "subject" TEXT NOT NULL;
