-- CreateTable
CREATE TABLE "maes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "endereco" VARCHAR(40) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "datanasc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "crm" VARCHAR(20) NOT NULL,
    "celular" VARCHAR(20) NOT NULL,
    "especialidade" VARCHAR(20) NOT NULL,

    CONSTRAINT "medicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bebes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60) NOT NULL,
    "datanasc" TIMESTAMP(3) NOT NULL,
    "peso" DECIMAL(5,3) NOT NULL,
    "altura" DECIMAL(4,2) NOT NULL,
    "maeId" INTEGER NOT NULL,
    "medicoId" INTEGER NOT NULL,

    CONSTRAINT "bebes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bebes" ADD CONSTRAINT "bebes_maeId_fkey" FOREIGN KEY ("maeId") REFERENCES "maes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bebes" ADD CONSTRAINT "bebes_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "medicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
