-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "restaurantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logoUrl" TEXT,
    "bannerImageUrl" TEXT,
    "primaryColor" TEXT,
    "whatsappNumber" TEXT,
    "phoneNumber" TEXT,
    "location" TEXT,
    "instagramUrl" TEXT,
    "welcomeMessage" TEXT,
    "layoutType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Income" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningHour" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "OpeningHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
