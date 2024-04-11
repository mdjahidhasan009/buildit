/*
  Warnings:

  - The primary key for the `Diagram` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Diagram" DROP CONSTRAINT "Diagram_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Diagram_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Diagram_id_seq";
