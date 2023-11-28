import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe, 
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { marca_usr_usuario } from '@prisma/client';
import { Auth, GetUser } from 'src/users/decorators'; 
import { HEADER_API_BEARER_AUTH } from 'src/common/const';

@ApiTags('Employes')
@Auth()
@Controller('v1/employes')
@ApiBearerAuth(HEADER_API_BEARER_AUTH)
export class EmployesController {
  constructor(private readonly employesService: EmployesService) {}

  @Post() 
  create(
    @Body() createEmployeDto: CreateEmployeDto,
    @GetUser() user: marca_usr_usuario,
  ): Promise<CreateEmployeDto> {
    return this.employesService.create(createEmployeDto, user);
  }

  @Get()
  findAll() {
    return this.employesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeDto: UpdateEmployeDto,
    @GetUser() user: marca_usr_usuario,
  ) {
    return this.employesService.update(id, updateEmployeDto, user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: marca_usr_usuario,
  ) {
    return this.employesService.remove(id, user);
  }
}
