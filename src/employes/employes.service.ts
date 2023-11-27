import { Injectable, Logger } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { PrismaService } from 'src/common/services';
import { marca_emp_empleados, marca_usr_usuario } from '@prisma/client';

@Injectable()
export class EmployesService {
  private readonly logger = new Logger('EmployesService');

  constructor(private readonly prisma: PrismaService) {}

  async create(
    createEmployeDto: CreateEmployeDto,
    user: marca_usr_usuario,
  ): Promise<CreateEmployeDto> {
    var data: any = {
      ...createEmployeDto,
      emp_feccrea: new Date(),
      emp_fecmod: new Date(),
      emp_usrcrea: user.usr_nombres + ' ' + user.usr_apellidos,
      emp_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
    };
    try {
      const register = await this.prisma.marca_emp_empleados.create({ data });
      return register;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.prisma.marca_emp_empleados.findMany({
      where: { emp_estado: 'ACTIVE' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.marca_emp_empleados.findMany({
      where: { emp_estado: 'ACTIVE', marca_emp_pk: id },
    });
  }

  async update(
    id: string,
    updateEmployeDto: UpdateEmployeDto,
    user: marca_usr_usuario,
  ) {
    var data: any = {
      ...updateEmployeDto,
      emp_fecmod: new Date(),
      emp_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
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
    try {
      const register = await this.prisma.marca_emp_empleados.update({
        where: { marca_emp_pk: id },
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
