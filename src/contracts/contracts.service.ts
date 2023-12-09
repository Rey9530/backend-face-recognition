import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/common/services';
import { mar_ctr_contratos, mar_usr_usuario } from '@prisma/client';
import { convert_date } from 'src/common/helpers/conver_date.heper';

@Injectable()
export class ContractsService {
  private readonly logger = new Logger('EmployesService');

  constructor(private readonly prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto, user: mar_usr_usuario) {
    var ctr_fecha_inicio = convert_date(createProjectDto.ctr_fecha_inicio);
    var ctr_fecha_fin = convert_date(createProjectDto.ctr_fecha_fin);

    ctr_fecha_fin.setHours(ctr_fecha_fin.getHours() + 23);
    ctr_fecha_fin.setMinutes(ctr_fecha_fin.getMinutes() + 59);
    if (ctr_fecha_inicio.getTime() > ctr_fecha_fin.getTime()) {
      throw new InternalServerErrorException(
        'Las fecha de inicio del proyecto no debe ser mayor a la fecha final',
      );
    }
    try {
      var data = {
        ctr_nombre: createProjectDto.ctr_nombre,
        ctr_num_contrato: createProjectDto.ctr_numero_contrato,
        ctr_fecha_inicio,
        ctr_fecha_fin,
        ctr_usrcrea: user.usr_nombres + ' ' + user.usr_apellidos,
        ctr_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        ctr_codepr: createProjectDto.marca_ctr_empre,
        ctr_horas_extras: createProjectDto.horas_extras,
        ctr_fecha_inipro:
          createProjectDto.ctr_fecha_inicio_pro != null
            ? convert_date(createProjectDto.ctr_fecha_inicio_pro)
            : null,
        ctr_fecha_finpro:
          createProjectDto.ctr_fecha_fin_pro != null
            ? convert_date(createProjectDto.ctr_fecha_fin_pro)
            : null,
      };
      return await this.prisma.mar_ctr_contratos.create({ data });
    } catch (error) {
      console.log(error.toString());
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.mar_ctr_contratos.findMany({
        where: { ctr_estado: 'ACTIVE' },
        include: { mar_epr_empresas: { select: { epr_nombre: true } } },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      var respDb = await this.prisma.mar_ctr_contratos.findFirst({
        where: { ctr_codigo: id, ctr_estado: 'ACTIVE' },
        include: { mar_epr_empresas: { select: { epr_nombre: true, epr_codigo: true, } } },
      });
    } catch (error) {
      return error;
    }

    if (!respDb) throw new NotFoundException('Registro no encontrado');
    return respDb;
  }

  async getCompanies() {
    return await this.prisma.mar_epr_empresas.findMany({
      where: { epr_estado: 'ACTIVE' },
      select: { epr_codigo: true, epr_nombre: true },
    });
  }
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: mar_usr_usuario,
  ) {
    await this.findOne(id);
    var ctr_fecha_inicio = convert_date(updateProjectDto.ctr_fecha_inicio);
    var ctr_fecha_fin = convert_date(updateProjectDto.ctr_fecha_fin);
    ctr_fecha_fin.setHours(ctr_fecha_fin.getHours() + 23);
    ctr_fecha_fin.setMinutes(ctr_fecha_fin.getMinutes() + 59);
    if (ctr_fecha_inicio.getTime() > ctr_fecha_fin.getTime()) {
      throw new InternalServerErrorException(
        'Las fecha de inicio del proyecto no debe ser mayor a la fecha final',
      );
    }
    try {
      var data: any = {
        ctr_nombre: updateProjectDto.ctr_nombre,
        ctr_num_contrato: updateProjectDto.ctr_numero_contrato,
        ctr_fecha_inicio,
        ctr_fecha_fin,
        ctr_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        ctr_codepr: updateProjectDto.marca_ctr_empre,
        ctr_horas_extras: updateProjectDto.horas_extras,
        ctr_fecha_inipro:
          updateProjectDto.ctr_fecha_inicio_pro != null
            ? convert_date(updateProjectDto.ctr_fecha_inicio_pro)
            : null,
        ctr_fecha_finpro:
          updateProjectDto.ctr_fecha_fin_pro != null
            ? convert_date(updateProjectDto.ctr_fecha_fin_pro)
            : null,
      };
      var respDb = await this.prisma.mar_ctr_contratos.update({
        where: { ctr_codigo: id, ctr_estado: 'ACTIVE' },
        data,
      });
      if (!respDb) throw new NotFoundException('Registro no encontrado');
      return respDb;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string, user: mar_usr_usuario) {
    await this.findOne(id);
    try {
      var respDb = await this.prisma.mar_ctr_contratos.update({
        where: { ctr_codigo: id, ctr_estado: 'ACTIVE' },
        data: {
          ctr_estado: 'INACTIVE',
          ctr_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        },
      });
    } catch (error) {
      return error;
    }
    return respDb;
  }
}
