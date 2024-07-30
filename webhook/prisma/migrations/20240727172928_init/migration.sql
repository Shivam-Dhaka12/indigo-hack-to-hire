-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flight_id" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "departure_gate" TEXT NOT NULL,
    "arrival_gate" TEXT NOT NULL,
    "scheduled_departure" TIMESTAMP(3) NOT NULL,
    "scheduled_arrival" TIMESTAMP(3) NOT NULL,
    "actual_departure" TIMESTAMP(3),
    "actual_arrival" TIMESTAMP(3),

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "flight_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flight_id" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Flight_flight_id_key" ON "Flight"("flight_id");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flight"("flight_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "Flight"("flight_id") ON DELETE RESTRICT ON UPDATE CASCADE;
