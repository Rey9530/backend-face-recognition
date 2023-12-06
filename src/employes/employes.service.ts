import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { PrismaService } from 'src/common/services';
import { marca_asig_asignacion, marca_usr_usuario } from '@prisma/client';
import { isUUID } from 'class-validator';
import { CodeEmployeDto } from './dto/code-employe.dto';
import { PaginationDto } from 'src/common/dto/Pagination-dto';

@Injectable()
export class EmployesService {
  private readonly logger = new Logger('EmployesService');

  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEmployeDto: CreateEmployeDto,
    user: marca_usr_usuario,
  ): Promise<any> {
    var data: any = {
      marca_emp_gen_fk: createEmployeDto.marca_emp_gen,
      marca_emp_ubi_fk: createEmployeDto.marca_emp_ubi,
      marca_emp_cn_fk: createEmployeDto.marca_emp_cn,
      emp_feccrea: new Date(),
      emp_fecmod: new Date(),
      emp_usrcrea: user.usr_nombres + ' ' + user.usr_apellidos,
      emp_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
      emp_estado: 'ACTIVE',
      marca_emp_empre_fk: createEmployeDto.marca_emp_empre,
      emp_codigo: createEmployeDto.emp_codigo,
      emp_fecha_nacimiento: new Date(createEmployeDto.emp_fecha_nacimiento),
      emp_nombres: createEmployeDto.emp_nombres,
      emp_apellidos: createEmployeDto.emp_apellidos,
    };
    try {
      var employe = await this.prisma.marca_emp_empleados.create({ data });

      if (
        createEmployeDto.marca_asig_proy &&
        isUUID(createEmployeDto.marca_asig_proy)
      ) {
        //TODO: Agregar validacion de identificar si existe la empresa
        var proyecto: any = {
          asig_hora_inicio: new Date(),
          asig_hora_fin: new Date(),
          asig_usrcrea: user.usr_nombres + ' ' + user.usr_apellidos,
          asig_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
          marca_asig_proy_fk: createEmployeDto.marca_asig_proy,
          marca_asig_emp_fk: employe.marca_emp_pk,
        };
        await this.prisma.marca_asig_asignacion.create({ data: proyecto });
      }
      return employe;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getSedes() {
    return await this.prisma.marca_ubi_ubicacion.findMany({
      where: { ubi_estado: 'ACTIVE' },
      select: { marca_ubi_pk: true, ubi_nombre: true },
    });
  }

  async getCompanies() {
    return await this.prisma.marca_empre_empresas.findMany({
      where: { empre_estado: 'ACTIVE' },
      select: { marca_empre_pk: true, empre_nombre: true },
    });
  }
  async getCatalogs() {
    const [sedes, contratation, gender, companies] = await Promise.all([
      await this.getSedes(),
      await this.getContratation(),
      await this.getGender(),
      await this.getCompanies(),
    ]);
    return { sedes, contratation, gender, companies };
  }

  async getContratation() {
    return await this.prisma.marca_cn_contratacion.findMany({
      where: { cn_estado: 'ACTIVE' },
      select: { marca_cn_pk: true, cn_nombre: true },
    });
  }

  async getGender() {
    return await this.prisma.marca_gen_genero.findMany({
      where: { gen_estado: 'ACTIVE' },
      select: { marca_gen_pk: true, gen_nombre: true },
    });
  }

  async findAll(codeEmploye: PaginationDto) {
    var or_ = {};
    if (codeEmploye.query.length > 3) {
      var arrayWhere = [];
      var arrayWords = codeEmploye.query.split(' ');
      arrayWords.forEach((contains) => {
        if (contains.length > 0) {
          arrayWhere.push({
            emp_nombres: {
              contains,
              mode: 'insensitive',
            },
          });
          arrayWhere.push({
            emp_apellidos: {
              contains,
              mode: 'insensitive',
            },
          });
          arrayWhere.push({
            emp_codigo: {
              contains,
              mode: 'insensitive',
            },
          });
        }
      });
      or_ = { OR: arrayWhere };
    }
    var wCompany = {};
    if (isUUID(codeEmploye.company)) {
      wCompany = { marca_emp_empre_fk: codeEmploye.company };
    }
    var where: any = { ...wCompany, emp_estado: 'ACTIVE', ...or_ };

    var employes = await this.prisma.marca_emp_empleados.findMany({
      where,
      orderBy: { emp_nombres: 'asc' },
      include: {
        marca_gen_genero: true,
        marca_asig_asignacion: true,
        marca_cn_contratacion: true,
        marca_ubi_ubicacion: true,
      },
      take: Number(codeEmploye.quantity),
      skip: (Number(codeEmploye.page) - 1) * Number(codeEmploye.quantity),
    });
    const total = await this.prisma.marca_emp_empleados.count({ where });
    return {
      employes,
      pagination: {
        page: Number(codeEmploye.page),
        quantity: Number(codeEmploye.quantity),
        total,
      },
    };
  }
  async generateCode(codeEmploye: CodeEmployeDto) {
    var dateArray = codeEmploye.emp_fecha_nacimiento.split('-');
    var year = dateArray[0].toString();
    var precode = year[2] + year[3] + dateArray[1];

    var respDb = await this.prisma.marca_emp_empleados.findMany({
      where: { emp_estado: 'ACTIVE', emp_codigo: { contains: precode } },
    });
    var code =
      precode.toString() +
      (respDb.length + 1).toString().padStart(3, '0').toString();

    return { code: code };
  }

  async findOne(id: string) {
    var respDb = await this.prisma.marca_emp_empleados.findFirst({
      where: { emp_estado: 'ACTIVE', marca_emp_pk: id },
      include: {
        marca_gen_genero: true,
        marca_asig_asignacion: true,
        marca_cn_contratacion: true,
        marca_ubi_ubicacion: true,
      },
    });
    if (!respDb) throw new NotFoundException(`Regisro no encontrado`);
    return respDb;
  }

  async update(
    id: string,
    updateEmployeDto: UpdateEmployeDto,
    user: marca_usr_usuario,
  ) {
    await this.findOne(id);
    var data: any = {
      marca_emp_gen_fk: updateEmployeDto.marca_emp_gen,
      marca_emp_ubi_fk: updateEmployeDto.marca_emp_ubi,
      marca_emp_cn_fk: updateEmployeDto.marca_emp_cn,
      emp_fecha_nacimiento: new Date(updateEmployeDto.emp_fecha_nacimiento),
      emp_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
      marca_emp_empre_fk: updateEmployeDto.marca_emp_empre,
      emp_codigo: updateEmployeDto.emp_codigo,
      emp_nombres: updateEmployeDto.emp_nombres,
      emp_apellidos: updateEmployeDto.emp_apellidos,
    };
    try {
      const register = await this.prisma.marca_emp_empleados.update({
        where: { marca_emp_pk: id, emp_estado: 'ACTIVE' },
        data,
      });
      return register;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string, user: marca_usr_usuario) {
    await this.findOne(id);
    try {
      const register = await this.prisma.marca_emp_empleados.update({
        where: { marca_emp_pk: id, emp_estado: 'ACTIVE' },
        data: {
          emp_estado: 'INACTIVE',
          emp_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
          emp_fecmod: new Date(),
        },
      });
      return register;
    } catch (error) {
      return error;
    }
  }
}
