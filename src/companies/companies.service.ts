import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto'; 
import { marca_empre_empresas, marca_usr_usuario } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma.service';
import { ApiResp } from 'src/common/class';

@Injectable()
export class CompaniesService {

  private readonly logger = new Logger('CompaniesService');
  constructor(
    private prisma: PrismaService,
  ) { }
  async create(createCompanyDto: CreateCompanyDto, user: marca_usr_usuario) {

    try {
      const userFullName = user.usr_nombres + " " + user.usr_apellidos;
      var data: any = {
        marca_empre_usr_fk: user.marca_usr_pk,
        empre_nombre: createCompanyDto.empre_nombre,
        empre_direccion: createCompanyDto.empre_direccion,
        empre_contacto_nombre: createCompanyDto.empre_contacto_nombre,
        empre_contacto_correo: createCompanyDto.empre_contacto_correo,
        empre_contacto_telefono: createCompanyDto.empre_contacto_telefono,
        empre_usrcrea: userFullName,
        empre_usrmod: userFullName,
      }
      const register = await this.prisma.marca_empre_empresas.create({ data });
      delete register.marca_empre_usr_fk;
      return register;
    } catch (error) {
      this.logger.error(error)
      if (error.code === '23505')
        throw new BadRequestException(error.detail);
      return error;
    }
  }

  findAll() {
    return this.prisma.marca_empre_empresas.findMany({ where: { empre_estado: 'ACTIVE' } });
  }

  async findOne(id: string) {
    let register = await this.prisma.marca_empre_empresas.findFirst({ where: { marca_empre_pk: id, empre_estado: 'ACTIVE' } });
    if (!register)
      throw new NotFoundException(`Regisro no encontrado`);
    return register;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: marca_usr_usuario) {
    await this.findOne(id);
    try {
      const userFullName = user.usr_nombres + " " + user.usr_apellidos;
      var data: any = {
        ...updateCompanyDto,
        empre_usrmod: userFullName,
      }
      const RespDb = await this.prisma.marca_empre_empresas.update({
        where: { marca_empre_pk: id },
        data
      });
      delete RespDb.marca_empre_usr_fk;
      if (!RespDb) throw new NotFoundException(`Empresa no encontrada`);
      return RespDb;
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.detail);
    }
  }

  async remove(id: string, user: marca_usr_usuario) {
    await this.findOne(id);
    try {
      const userFullName = user.usr_nombres + " " + user.usr_apellidos;
      const RespDb = await this.prisma.marca_empre_empresas.update({
        where: { marca_empre_pk: id },
        data: {
          empre_estado: 'INACTIVE',
          empre_usrmod: userFullName,
        }
      });
      if (!RespDb) throw new NotFoundException(`Empresa no encontrada`);
      return RespDb;
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.detail);
    }
  }
}
