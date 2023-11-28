import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto, CreateUserDto, UpdateUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { marca_usr_usuario } from '@prisma/client';
import { PrismaService } from 'src/common/services'; 

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto, user: marca_usr_usuario) {
    try {
      const { usr_contrasenia, ...resto } = createUserDto;
      const register = await this.prisma.marca_usr_usuario.create({
        data: {
          ...resto,
          usr_contrasenia: bcrypt.hashSync(usr_contrasenia, 10),
          usr_usrcrea: user.usr_nombres + " " + user.usr_apellidos,
          usr_usrmod: user.usr_nombres + " " + user.usr_apellidos
        }
      });
      delete register.usr_contrasenia;
      return register;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async login(createUserDto: CreateAuthDto): Promise<any> {

    const { password, user_code } = createUserDto;

    const user = await this.prisma.marca_usr_usuario.findFirst({
      where: { usr_codigo: user_code },
      select: { marca_usr_pk: true, usr_codigo: true, usr_nombres: true, usr_apellidos: true, usr_contrasenia: true, usr_estado: true } //! OJO!
    });

    if (!user)
      throw new UnauthorizedException('Credenciales incorrectas');
    if (user.usr_estado == 'INACTIVE') throw new UnauthorizedException('Credenciales incorrectas')

    if (!bcrypt.compareSync(password, user.usr_contrasenia))
      throw new UnauthorizedException('Credenciales incorrectas');
    delete user.usr_contrasenia;
    delete user.marca_usr_pk;
    var data:any = {
      ...user,
      token: this.getJwtToken({ marca_usr_uuid: user.marca_usr_pk })
    };

    return data; 
  }

  async checkStatus(user: any) {

    try {
      const userN = await this.prisma.marca_usr_usuario.findFirst({
        where: { marca_usr_pk: user.marca_usr_pk },
        select: { marca_usr_pk: true, usr_codigo: true, usr_nombres: true, usr_apellidos: true, usr_contrasenia: true, usr_estado: true } //! OJO!
      });
      delete userN.usr_contrasenia;
      delete userN.marca_usr_pk;
      delete userN.usr_estado;
      return {
        ...userN,
        token: this.getJwtToken({ marca_usr_uuid: userN.marca_usr_pk })
      };
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Ha ocurrido un error favor intentarlo mas tarde');

    }
  }

  findAll() {
    return this.prisma.marca_usr_usuario.findMany({ where: { usr_estado: 'ACTIVE' } });
  }

  async findOne(term: string) {
    let resp = await this.prisma.marca_usr_usuario.findFirst({ where: { marca_usr_pk: term } });
    if (!resp)
      throw new NotFoundException(`Usuario con el id ${term} no encontrada`);

    return resp;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      const { usr_contrasenia, ...resto } = updateUserDto;
      var data: any = {
        ...resto,
        usr_contrasenia: bcrypt.hashSync(usr_contrasenia, 10)
      }
      const product = await this.prisma.marca_usr_usuario.update({
        where: { marca_usr_pk: id },
        data
      });
      if (!product) throw new NotFoundException(`Product with id: ${id} not found`);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const resp = await this.findOne(id);
    await this.prisma.marca_usr_usuario.update({
      where: { marca_usr_pk: resp.marca_usr_pk },
      data: { usr_estado: 'INACTIVE' }
    })
  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error) 
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
