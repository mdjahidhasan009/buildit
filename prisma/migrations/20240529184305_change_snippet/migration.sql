/*
  Warnings:

  - The `customColors` column on the `snippets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "snippets" DROP COLUMN "customColors",
ADD COLUMN     "customColors" TEXT[] DEFAULT ARRAY['#38bdf8', '#3b82f6']::TEXT[];
