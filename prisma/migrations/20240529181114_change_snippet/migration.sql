/*
  Warnings:

  - You are about to drop the column `viewId` on the `snippets` table. All the data in the column will be lost.
  - You are about to drop the `views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "snippets" DROP CONSTRAINT "snippets_viewId_fkey";

-- AlterTable
ALTER TABLE "snippets" DROP COLUMN "viewId",
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "views";
