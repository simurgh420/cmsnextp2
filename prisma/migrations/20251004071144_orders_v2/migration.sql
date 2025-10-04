/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "status",
ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE';
