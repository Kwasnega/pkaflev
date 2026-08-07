-- AlterTable
ALTER TABLE "Affiliate" ADD COLUMN     "account_status" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "available_balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "number_of_referrals" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cost_price" DECIMAL(65,30) NOT NULL DEFAULT 0.00;

-- CreateTable
CREATE TABLE "Payout" (
    "payout_id" SERIAL NOT NULL,
    "affiliate_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "decline_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("payout_id")
);

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "Affiliate"("affiliate_id") ON DELETE RESTRICT ON UPDATE CASCADE;
