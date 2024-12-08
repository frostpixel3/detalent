-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('QUOTING', 'WAITING_PAYMENT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MessageSender" AS ENUM ('TALENT', 'CUSTOMER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletAuthNonce" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "WalletAuthNonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "AuthTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,

    CONSTRAINT "TalentService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentServiceProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'QUOTING',
    "talentServiceId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "invoiceRequestId" TEXT,
    "invoiceAmount" TEXT,
    "invoiceDueDate" TIMESTAMP(3),

    CONSTRAINT "TalentServiceProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentServiceProjectMessage" (
    "id" TEXT NOT NULL,
    "talentServiceProjectId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sender" "MessageSender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TalentServiceProjectMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "WalletAuthNonce_address_key" ON "WalletAuthNonce"("address");

-- CreateIndex
CREATE UNIQUE INDEX "AuthTokens_userId_key" ON "AuthTokens"("userId");

-- AddForeignKey
ALTER TABLE "AuthTokens" ADD CONSTRAINT "AuthTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentService" ADD CONSTRAINT "TalentService_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentServiceProject" ADD CONSTRAINT "TalentServiceProject_talentServiceId_fkey" FOREIGN KEY ("talentServiceId") REFERENCES "TalentService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentServiceProject" ADD CONSTRAINT "TalentServiceProject_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TalentServiceProjectMessage" ADD CONSTRAINT "TalentServiceProjectMessage_talentServiceProjectId_fkey" FOREIGN KEY ("talentServiceProjectId") REFERENCES "TalentServiceProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
