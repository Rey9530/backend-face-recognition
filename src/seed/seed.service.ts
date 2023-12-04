import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('UsersService');

  constructor(private readonly prisma: PrismaService) {}
  async deleteSeed() {
    await this.prisma.marca_emp_empleados.deleteMany();
    await this.prisma.marca_empre_empresas.deleteMany();
    await this.prisma.marca_usr_usuario.deleteMany();
    await this.prisma.marca_gen_genero.deleteMany();
    await this.prisma.marca_ubi_ubicacion.deleteMany();
    await this.prisma.marca_cn_contratacion.deleteMany();
    await this.prisma.marca_dia_dias.deleteMany();
  }

  async executeSeed() {
    try {
      await this.deleteSeed();
      var cremod = 'Creado por el seeder';
      await this.prisma.marca_ubi_ubicacion.createMany({
        data: [
          {
            ubi_nombre: 'Central hidroeléctrica Guajoyo',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Central hidroeléctrica Cerrón Grande',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Central hidroeléctrica 5 de Noviembre',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Central hidroeléctrica 15 de Septiembre',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Central Hidroeléctrica 3 de Febrero',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Centro de Atención a Primera Infancia (CAPI)',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Oficina Central',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Almacén Central San Ramón',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Centro Social Costa CEL',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
          {
            ubi_nombre: 'Maquinaria y Equipo pesado (Albergue de Jiquilisco)',
            ubi_usrcrea: cremod,
            ubi_usrmod: cremod,
          },
        ],
      });
      var gender = await this.prisma.marca_gen_genero.create({
        data: {
          gen_nombre: 'Masculino',
          gen_usrcrea: cremod,
          gen_usrmod: cremod,
        },
      });

      await this.prisma.marca_gen_genero.create({
        data: {
          gen_nombre: 'Femenino',
          gen_usrcrea: cremod,
          gen_usrmod: cremod,
        },
      });

      await this.prisma.marca_dia_dias.createMany({
        data: [
          {
            dia_nombre: 'Lunes',
            dia_code: 'LU',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
          {
            dia_nombre: 'Martes',
            dia_code: 'MA',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
          {
            dia_nombre: 'Miercoles',
            dia_code: 'MI',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
          {
            dia_nombre: 'Jueves',
            dia_code: 'JU',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
          {
            dia_nombre: 'Viernes',
            dia_code: 'VI',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
          {
            dia_nombre: 'Sabado',
            dia_code: 'SA',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
          {
            dia_nombre: 'Domingo',
            dia_code: 'DO',
            dia_usrmod: cremod,
            dia_usrcrea: cremod,
          },
        ],
      });

      var ubicacion1 = await this.prisma.marca_ubi_ubicacion.create({
        data: {
          ubi_nombre: 'Central',
          ubi_usrcrea: cremod,
          ubi_usrmod: cremod,
        },
      });

      await this.prisma.marca_ubi_ubicacion.create({
        data: {
          ubi_nombre: 'Bodegas San Ramon',
          ubi_usrcrea: cremod,
          ubi_usrmod: cremod,
        },
      });

      var contrataciones1 = await this.prisma.marca_cn_contratacion.create({
        data: {
          cn_nombre: 'Fijo',
          cn_usrcrea: cremod,
          cn_usrmod: cremod,
        },
      });
      await this.prisma.marca_cn_contratacion.create({
        data: {
          cn_nombre: 'Apoyo',
          cn_usrcrea: cremod,
          cn_usrmod: cremod,
        },
      });
      await this.prisma.marca_cn_contratacion.create({
        data: {
          cn_nombre: 'Reemplazo',
          cn_usrcrea: cremod,
          cn_usrmod: cremod,
        },
      });

      var usuario = await this.prisma.marca_usr_usuario.create({
        data: {
          usr_codigo: '12345678',
          usr_nombres: 'Usuario',
          usr_apellidos: 'Administrador',
          usr_contrasenia: bcrypt.hashSync('12345678', 10),
          usr_usrcrea: cremod,
          usr_usrmod: cremod,
        },
      });

      var empresa = await this.prisma.marca_empre_empresas.create({
        data: {
          empre_nombre: 'Empresa 1',
          empre_direccion: 'San Salvador',
          empre_contacto_nombre: 'Contacto Nombre',
          empre_contacto_correo: 'demo@demo.com',
          empre_contacto_telefono: '+50365326545',
          empre_usrcrea: cremod,
          empre_usrmod: cremod,
          marca_empre_usr_fk: usuario.marca_usr_pk,
        },
      });

      var empleado = await this.prisma.marca_emp_empleados.create({
        data: {
          emp_codigo: 'T-8502001',
          emp_fecha_nacimiento: new Date(),
          emp_nombres: 'Empleado',
          emp_apellidos: 'Tercerizado',
          emp_usrcrea: cremod,
          emp_usrmod: cremod,
          marca_emp_empre_fk: empresa.marca_empre_pk,
          marca_emp_gen_fk: gender.marca_gen_pk,
          marca_emp_ubi_fk: ubicacion1.marca_ubi_pk,
          marca_emp_cn_fk: contrataciones1.marca_cn_pk,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
