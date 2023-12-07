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

  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, user: marca_usr_usuario) {
    var proy_fecha_inicio = new Date(createProjectDto.proy_fecha_inicio);
    var proy_fecha_fin = new Date(createProjectDto.proy_fecha_fin);

    proy_fecha_fin.setHours(proy_fecha_fin.getHours() + 23);
    proy_fecha_fin.setMinutes(proy_fecha_fin.getMinutes() + 59);
    if (proy_fecha_inicio.getTime() > proy_fecha_fin.getTime()) {
      throw new InternalServerErrorException(
        'Las fecha de inicio del proyecto no debe ser mayor a la fecha final',
      );
    }
    try {
      var data: any = {
        proy_nombre: createProjectDto.proy_nombre,
        proy_numero_contrato: createProjectDto.proy_numero_contrato,
        proy_fecha_inicio,
        proy_fecha_fin,
        proy_usrcrea: user.usr_nombres + ' ' + user.usr_apellidos,
        proy_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        marca_proy_empre_fk: createProjectDto.marca_proy_empre,
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
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      var respDb = await this.prisma.marca_ctr_contratos.findFirst({
        where: { marca_ctr_pk: id,  ctr_estado:'ACTIVE' },
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
    var proy_fecha_inicio = new Date(updateProjectDto.proy_fecha_inicio);
    var proy_fecha_fin = new Date(updateProjectDto.proy_fecha_fin); 
    proy_fecha_fin.setHours(proy_fecha_fin.getHours() + 23);
    proy_fecha_fin.setMinutes(proy_fecha_fin.getMinutes() + 59);
    if (proy_fecha_inicio.getTime() > proy_fecha_fin.getTime()) {
      throw new InternalServerErrorException(
        'Las fecha de inicio del proyecto no debe ser mayor a la fecha final',
      );
    }
    try {
      var data: any = {
        proy_nombre: updateProjectDto.proy_nombre,
        proy_numero_contrato: updateProjectDto.proy_numero_contrato,
        proy_fecha_inicio,
        proy_fecha_fin,
        proy_usrmod: user.usr_nombres + ' ' + user.usr_apellidos,
        marca_proy_empre_fk: updateProjectDto.marca_proy_empre,
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
      var data: any = { proy_estado: 'INACTIVE' };
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
