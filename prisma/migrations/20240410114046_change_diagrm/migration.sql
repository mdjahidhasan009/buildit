/*
  Warnings:

  - You are about to drop the column `fileName` on the `Diagram` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Diagram" DROP COLUMN "fileName",
ADD COLUMN     "title" TEXT,
ALTER COLUMN "editorData" DROP NOT NULL,
ALTER COLUMN "diagramData" DROP NOT NULL;
