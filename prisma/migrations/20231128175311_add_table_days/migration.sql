-- CreateTable
CREATE TABLE "marca_dia_dias" (
    "marca_dia_pk" TEXT NOT NULL,
    "dia_nombre" TEXT NOT NULL,
    "dia_code" TEXT NOT NULL,
    "dia_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "dia_feccrea" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dia_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dia_usrcrea" TEXT NOT NULL,
    "dia_usrmod" TEXT NOT NULL,

    CONSTRAINT "marca_dia_dias_pkey" PRIMARY KEY ("marca_dia_pk")
);
