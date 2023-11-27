/*
  Warnings:

  - The primary key for the `marca_cn_contratacion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `marca_tipc_pk` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipc_estado` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipc_feccrea` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipc_fecmod` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipc_nombre` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipc_usrcrea` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `tipc_usrmod` on the `marca_cn_contratacion` table. All the data in the column will be lost.
  - You are about to drop the column `marca_emp_tipc_fk` on the `marca_emp_empleados` table. All the data in the column will be lost.
  - Added the required column `cn_nombre` to the `marca_cn_contratacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cn_usrcrea` to the `marca_cn_contratacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cn_usrmod` to the `marca_cn_contratacion` table without a default value. This is not possible if the table is not empty.
  - The required column `marca_cn_pk` was added to the `marca_cn_contratacion` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `marca_emp_cn_fk` to the `marca_emp_empleados` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "marca_emp_empleados" DROP CONSTRAINT "marca_emp_tipc_fk";

-- AlterTable
ALTER TABLE "marca_cn_contratacion" DROP CONSTRAINT "marca_cn_contratacion_pkey",
DROP COLUMN "marca_tipc_pk",
DROP COLUMN "tipc_estado",
DROP COLUMN "tipc_feccrea",
DROP COLUMN "tipc_fecmod",
DROP COLUMN "tipc_nombre",
DROP COLUMN "tipc_usrcrea",
DROP COLUMN "tipc_usrmod",
ADD COLUMN     "cn_estado" "Estado" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "cn_feccrea" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cn_fecmod" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "cn_nombre" TEXT NOT NULL,
ADD COLUMN     "cn_usrcrea" TEXT NOT NULL,
ADD COLUMN     "cn_usrmod" TEXT NOT NULL,
ADD COLUMN     "marca_cn_pk" TEXT NOT NULL,
ADD CONSTRAINT "marca_cn_contratacion_pkey" PRIMARY KEY ("marca_cn_pk");

-- AlterTable
ALTER TABLE "marca_emp_empleados" DROP COLUMN "marca_emp_tipc_fk",
ADD COLUMN     "marca_emp_cn_fk" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "marca_emp_empleados" ADD CONSTRAINT "marca_emp_tipc_fk" FOREIGN KEY ("marca_emp_cn_fk") REFERENCES "marca_cn_contratacion"("marca_cn_pk") ON DELETE NO ACTION ON UPDATE NO ACTION;
