import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/common/services';
import { marca_ctr_contratos, marca_usr_usuario } from '@prisma/client';

@Injectable()
export class ContractsService {
  private readonly logger = new Logger('EmployesService');

  constructor(private readonly prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto, user: marca_usr_usuario) {
    var ctr_fecha_inicio = new Date(createProjectDto.ctr_fecha_inicio);
    var ctr_fecha_fin = new Date(createProjectDto.ctr_fecha_fin);

    ctr_fecha_fin.setHours(ctr_fecha_fin.getHours() + 23);
    ctr_fecha_fin.setMinutes(ctr_fecha_fin.getMinutes() + 59);
    if (ctr_fecha_inicio.getTime() > ctr_fecha_fin.getTime()) {
      throw new InternalServerErrorException(
        'Las fecha de inicio del proyecto no debe ser mayor a la fecha final',
      );
    }
    try {
      var data: any = {
        ctr_nombre: createProjectDto.ctr_nombre,
        ctr_numero_contrato: createProjectDto.ctr_numero_contrato,
        ctr_fecha_inicio,
        ctr_fecha_fin,
        ctr_usrcrea: user.usr_nombres + ' ' + user.usr_apellidos,
        ctr_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        marca_ctr_empre_fk: createProjectDto.marca_ctr_empre,
        ctr_horas_extras: createProjectDto.horas_extras,
        ctr_fecha_inicio_pro: createProjectDto.ctr_fecha_inicio_pro != null ? new Date(createProjectDto.ctr_fecha_inicio_pro) : null,
        ctr_fecha_fin_pro: createProjectDto.ctr_fecha_fin_pro != null ? new Date(createProjectDto.ctr_fecha_fin_pro) : null,
      };
      return await this.prisma.marca_ctr_contratos.create({ data });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.marca_ctr_contratos.findMany({
        where: { ctr_estado: 'ACTIVE' },
        include: { marca_empre_empresas: { select: { empre_nombre: true } } }
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      var respDb = await this.prisma.marca_ctr_contratos.findFirst({
        where: { marca_ctr_pk: id, ctr_estado: 'ACTIVE' },
      });
    } catch (error) {
      return error;
    }

    if (!respDb) throw new NotFoundException('Registro no encontrado');
    return respDb;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user: marca_usr_usuario,
  ) {
    await this.findOne(id);
    var ctr_fecha_inicio = new Date(updateProjectDto.ctr_fecha_inicio);
    var ctr_fecha_fin = new Date(updateProjectDto.ctr_fecha_fin);
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
        ctr_numero_contrato: updateProjectDto.ctr_numero_contrato,
        ctr_fecha_inicio,
        ctr_fecha_fin,
        ctr_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        marca_ctr_empre_fk: updateProjectDto.marca_ctr_empre,
      };
      var respDb = await this.prisma.marca_ctr_contratos.update({
        where: { marca_ctr_pk: id, ctr_estado: 'ACTIVE' },
        data,
      });
      if (!respDb) throw new NotFoundException('Registro no encontrado');
      return respDb;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      var data: any = { ctr_estado: 'INACTIVE' };
      var respDb = await this.prisma.marca_ctr_contratos.update({
        where: { marca_ctr_pk: id, ctr_estado: 'ACTIVE' },
        data,
      });
    } catch (error) {
      return error;
    }
    return respDb;
  }
}
