-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "booking_id" TEXT NOT NULL,
    "tutor_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reviews_rating_idx" ON "Reviews"("rating");

-- CreateIndex
CREATE INDEX "Reviews_tutor_id_idx" ON "Reviews"("tutor_id");
