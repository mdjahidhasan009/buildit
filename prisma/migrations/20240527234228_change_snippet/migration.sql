/*
  Warnings:

  - Added the required column `viewId` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_snippetId_fkey";

-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "viewId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "views"("snippetId") ON DELETE CASCADE ON UPDATE CASCADE;
