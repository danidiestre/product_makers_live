-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "problema" TEXT NOT NULL,
    "solucion" TEXT NOT NULL,
    "funcionalidades" TEXT NOT NULL,
    "monetizacion" TEXT NOT NULL,
    "roadmap" TEXT NOT NULL,
    "tecnologia" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
