import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {

  private readonly logger = new Logger('UsersService');

  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async deleteSeed() {
    await this.prisma.marca_emp_empleados.deleteMany();
    await this.prisma.marca_empre_empresas.deleteMany();
    await this.prisma.marca_usr_usuario.deleteMany();
    await this.prisma.marca_gen_genero.deleteMany();
    await this.prisma.marca_ubi_ubicacion.deleteMany();
    await this.prisma.marca_cn_contratacion.deleteMany();
  }
  async executeSeed() {
    await this.deleteSeed();
    var gender = await this.prisma.marca_gen_genero.create({
      data: {
        gen_nombre: 'Masculino',
        gen_usrcrea: 'Creado por el seeder',
        gen_usrmod: 'Creado por el seeder',
      }
    });

    await this.prisma.marca_gen_genero.create({
      data: {
        gen_nombre: 'Femenino',
        gen_usrcrea: 'Creado por el seeder',
        gen_usrmod: 'Creado por el seeder',
      }
    });

    var ubicacion1 = await this.prisma.marca_ubi_ubicacion.create({
      data:
      {
        ubi_nombre: 'Central',
        ubi_usrcrea: 'Creado por el seeder',
        ubi_usrmod: 'Creado por el seeder',
      },
    });

    await this.prisma.marca_ubi_ubicacion.create({
      data:
      {
        ubi_nombre: 'Bodegas San Ramon',
        ubi_usrcrea: 'Creado por el seeder',
        ubi_usrmod: 'Creado por el seeder',
      },
    });

    var contrataciones1 = await this.prisma.marca_cn_contratacion.create({
      data:
      {
        cn_nombre: 'Fijo',
        cn_usrcrea: 'Creado por el seeder',
        cn_usrmod: 'Creado por el seeder',
      },
    });
    await this.prisma.marca_cn_contratacion.create({
      data:
      {
        cn_nombre: 'Apoyo',
        cn_usrcrea: 'Creado por el seeder',
        cn_usrmod: 'Creado por el seeder',
      },
    });
    await this.prisma.marca_cn_contratacion.create({
      data:
      {
        cn_nombre: 'Reemplazo',
        cn_usrcrea: 'Creado por el seeder',
        cn_usrmod: 'Creado por el seeder',
      },
    });

    var usuario = await this.prisma.marca_usr_usuario.create({
      data: {
        usr_codigo: '12345678',
        usr_nombres: 'Usuario',
        usr_apellidos: 'Administrador',
        usr_contrasenia: bcrypt.hashSync("12345678", 10),
        usr_usrcrea: 'Creado por el seeder',
        usr_usrmod: 'Creado por el seeder',
      }
    });

    var empresa = await this.prisma.marca_empre_empresas.create({
      data:
      {
        empre_nombre: 'Empresa 1',
        empre_direccion: 'San Salvador',
        empre_contacto_nombre: 'Contacto Nombre',
        empre_contacto_correo: 'demo@demo.com',
        empre_contacto_telefono: '+50365326545',
        empre_usrcrea: 'Creado por el seeder',
        empre_usrmod: 'Creado por el seeder',
        marca_empre_usr_fk: usuario.marca_usr_pk,
      },
    });

    var empleado = await this.prisma.marca_emp_empleados.create({
      data: {
        emp_codigo: "T-8502001",
        emp_fecha_nacimiento: new Date(),
        emp_nombres: "Empleado",
        emp_apellidos: "Tercerizado",
        emp_usrcrea: "Creado por el seeder",
        emp_usrmod: "Creado por el seeder",
        marca_emp_empre_fk: empresa.marca_empre_pk,
        marca_emp_gen_fk: gender.marca_gen_pk,
        marca_emp_ubi_fk: ubicacion1.marca_ubi_pk,
        marca_emp_cn_fk: contrataciones1.marca_cn_pk,
      }
    });
  }

}
