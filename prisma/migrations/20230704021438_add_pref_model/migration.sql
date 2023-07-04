-- CreateTable
CREATE TABLE "Pref" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentDeck" TEXT,
    "defaultDeck" TEXT,
    "pref01" BOOLEAN,
    "pref02" BOOLEAN,
    "pref03" BOOLEAN,
    "pref04" BOOLEAN,
    "pref05" BOOLEAN,
    "prefa" TEXT,
    "prefb" TEXT,
    "prefc" TEXT,
    "prefd" TEXT,
    "prefe" TEXT,

    CONSTRAINT "Pref_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pref_userId_key" ON "Pref"("userId");

-- AddForeignKey
ALTER TABLE "Pref" ADD CONSTRAINT "Pref_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
