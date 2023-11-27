import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/users/decorators';
import { marca_usr_usuario } from '@prisma/client';
// import { MarcaUsrUsuario } from 'src/users/entities/user.entity';

@ApiTags('Companies')
@Controller('v1/companies')
@ApiResponse({ status: 400, description: 'Solicitud Incorrecta' })
@ApiResponse({ status: 403, description: 'Forbidden. Token related' })
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Empresa creada' })
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: marca_usr_usuario
  ) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @Auth()
  @ApiResponse({ status: 200, description: 'Listado de empresas' })
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @Auth()
  @ApiResponse({ status: 200, description: 'Empresa' })
  findOne(@Param('id', ParseUUIDPipe) id: string,) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiResponse({ status: 200, description: 'Empresa Actualizada' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCompanyDto: UpdateCompanyDto,
    @GetUser() user: marca_usr_usuario) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @Auth()
  @ApiResponse({ status: 200, description: 'Empresa eliminada' })
  remove(@Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: marca_usr_usuario) {
    return this.companiesService.remove(id, user);
  }
}
