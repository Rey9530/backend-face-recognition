-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "marca_gen_genero" (
    "marca_gen_pk" TEXT NOT NULL,
    "gen_nombre" TEXT NOT NULL,
    "gen_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "gen_feccrea" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gen_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gen_usrcrea" TEXT NOT NULL,
    "gen_usrmod" TEXT NOT NULL,

    CONSTRAINT "marca_gen_genero_pkey" PRIMARY KEY ("marca_gen_pk")
);

-- CreateTable
CREATE TABLE "marca_ubi_ubicacion" (
    "marca_ubi_pk" TEXT NOT NULL,
    "ubi_nombre" TEXT NOT NULL,
    "ubi_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "ubi_feccrea" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ubi_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ubi_usrcrea" TEXT NOT NULL,
    "ubi_usrmod" TEXT NOT NULL,

    CONSTRAINT "marca_ubi_ubicacion_pkey" PRIMARY KEY ("marca_ubi_pk")
);

-- CreateTable
CREATE TABLE "marca_cn_contratacion" (
    "marca_tipc_pk" TEXT NOT NULL,
    "tipc_nombre" TEXT NOT NULL,
    "tipc_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "tipc_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipc_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipc_usrcrea" TEXT NOT NULL,
    "tipc_usrmod" TEXT NOT NULL,

    CONSTRAINT "marca_cn_contratacion_pkey" PRIMARY KEY ("marca_tipc_pk")
);

-- CreateTable
CREATE TABLE "marca_emp_empleados" (
    "marca_emp_pk" TEXT NOT NULL,
    "emp_codigo" TEXT NOT NULL,
    "emp_fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "emp_nombres" TEXT NOT NULL,
    "emp_apellidos" TEXT NOT NULL,
    "emp_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "marca_emp_empre_fk" TEXT NOT NULL,
    "emp_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emp_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emp_usrcrea" TEXT NOT NULL,
    "emp_usrmod" TEXT NOT NULL,
    "marca_emp_gen_fk" TEXT NOT NULL,
    "marca_emp_ubi_fk" TEXT NOT NULL,
    "marca_emp_tipc_fk" TEXT NOT NULL,

    CONSTRAINT "marca_emp_empleados_pkey" PRIMARY KEY ("marca_emp_pk")
);

-- CreateTable
CREATE TABLE "marca_usr_usuario" (
    "marca_usr_pk" TEXT NOT NULL,
    "usr_codigo" TEXT NOT NULL,
    "usr_nombres" TEXT NOT NULL,
    "usr_apellidos" TEXT NOT NULL,
    "usr_contrasenia" TEXT NOT NULL,
    "usr_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "usr_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_usrcrea" TEXT NOT NULL,
    "usr_usrmod" TEXT NOT NULL,

    CONSTRAINT "marca_usr_usuario_pkey" PRIMARY KEY ("marca_usr_pk")
);

-- CreateTable
CREATE TABLE "marca_empre_empresas" (
    "marca_empre_pk" TEXT NOT NULL,
    "empre_nombre" TEXT NOT NULL,
    "empre_direccion" TEXT NOT NULL,
    "empre_contacto_nombre" TEXT NOT NULL,
    "empre_contacto_correo" TEXT NOT NULL,
    "empre_contacto_telefono" TEXT NOT NULL,
    "empre_usrcrea" TEXT NOT NULL,
    "empre_usrmod" TEXT NOT NULL,
    "empre_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empre_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empre_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "marca_empre_usr_fk" TEXT NOT NULL,

    CONSTRAINT "marca_empre_empresas_pkey" PRIMARY KEY ("marca_empre_pk")
);

-- CreateTable
CREATE TABLE "marca_proy_proyecto" (
    "marca_proy_pk" TEXT NOT NULL,
    "proy_nombre" TEXT NOT NULL,
    "proy_numero_contrato" TEXT NOT NULL,
    "proy_fecha_inicio" TIMESTAMP(3) NOT NULL,
    "proy_fecha_fin" TIMESTAMP(3) NOT NULL,
    "proy_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "proy_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proy_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "proy_usrcrea" TEXT NOT NULL,
    "proy_usrmod" TEXT NOT NULL,
    "marca_proy_empre_fk" TEXT NOT NULL,

    CONSTRAINT "marca_proy_proyecto_pkey" PRIMARY KEY ("marca_proy_pk")
);

-- CreateTable
CREATE TABLE "marca_asig_asignacion" (
    "marca_asig_pk" TEXT NOT NULL,
    "asig_hora_inicio" TIMESTAMP(3) NOT NULL,
    "asig_hora_fin" TIMESTAMP(3) NOT NULL,
    "proy_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "asig_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asig_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "asig_usrcrea" TEXT NOT NULL,
    "asig_usrmod" TEXT NOT NULL,
    "marca_asig_proy_fk" TEXT NOT NULL,
    "marca_asig_emp_fk" TEXT NOT NULL,

    CONSTRAINT "marca_asig_asignacion_pkey" PRIMARY KEY ("marca_asig_pk")
);

-- CreateTable
CREATE TABLE "marca_his_historial" (
    "marca_histm_pk" TEXT NOT NULL,
    "histm_marca" TIMESTAMP(3) NOT NULL,
    "emp_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
    "marca_histm_usr_fk" TEXT NOT NULL,
    "histm_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "histm_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "histm_usrcrea" TEXT NOT NULL,
    "histm_usrmod" TEXT NOT NULL,
    "marca_histm_asig_fk" TEXT NOT NULL,

    CONSTRAINT "marca_his_historial_pkey" PRIMARY KEY ("marca_histm_pk")
);

-- AddForeignKey
ALTER TABLE "marca_emp_empleados" ADD CONSTRAINT "marca_emp_gen_fk" FOREIGN KEY ("marca_emp_gen_fk") REFERENCES "marca_gen_genero"("marca_gen_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_emp_empleados" ADD CONSTRAINT "marca_emp_ubi_fk" FOREIGN KEY ("marca_emp_ubi_fk") REFERENCES "marca_ubi_ubicacion"("marca_ubi_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_emp_empleados" ADD CONSTRAINT "marca_emp_tipc_fk" FOREIGN KEY ("marca_emp_tipc_fk") REFERENCES "marca_cn_contratacion"("marca_tipc_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_empre_empresas" ADD CONSTRAINT "marca_empre_usr_fk" FOREIGN KEY ("marca_empre_usr_fk") REFERENCES "marca_usr_usuario"("marca_usr_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_proy_proyecto" ADD CONSTRAINT "marca_proy_empre_fk" FOREIGN KEY ("marca_proy_empre_fk") REFERENCES "marca_empre_empresas"("marca_empre_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_asig_asignacion" ADD CONSTRAINT "marca_asig_proy_fk" FOREIGN KEY ("marca_asig_proy_fk") REFERENCES "marca_proy_proyecto"("marca_proy_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_asig_asignacion" ADD CONSTRAINT "marca_asig_emp_fk" FOREIGN KEY ("marca_asig_emp_fk") REFERENCES "marca_emp_empleados"("marca_emp_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "marca_his_historial" ADD CONSTRAINT "marca_histm_asig_fk" FOREIGN KEY ("marca_histm_asig_fk") REFERENCES "marca_asig_asignacion"("marca_asig_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
