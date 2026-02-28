/*
  Warnings:

  - You are about to drop the column `MsgType` on the `Msg` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Msg" DROP COLUMN "MsgType",
ADD COLUMN     "msgType" "MsgType" NOT NULL DEFAULT 'NORMAL';
