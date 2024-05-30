/*
  Warnings:

  - You are about to drop the column `snippetId` on the `views` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "snippets" DROP CONSTRAINT "snippets_viewId_fkey";

-- DropIndex
DROP INDEX "views_snippetId_key";

-- AlterTable
ALTER TABLE "views" DROP COLUMN "snippetId";

-- AddForeignKey
ALTER TABLE "snippets" ADD CONSTRAINT "snippets_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "views"("id") ON DELETE CASCADE ON UPDATE CASCADE;
