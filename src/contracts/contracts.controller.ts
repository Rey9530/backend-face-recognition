import {
  Controller,
  Get,
  Post,
  Body, 
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/users/decorators';
import { marca_usr_usuario } from '@prisma/client'; 
import { HEADER_API_BEARER_AUTH } from 'src/common/const';

@ApiTags('Projects')
@Controller('v1/projects')
@Auth()
@ApiBearerAuth(HEADER_API_BEARER_AUTH)
export class ContractsController {
  constructor(private readonly projectsService: ContractsService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @GetUser() user: marca_usr_usuario,
  ) {
    return this.projectsService.create(createProjectDto, user);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: marca_usr_usuario,
  ) {
    return this.projectsService.update(id, updateProjectDto,user);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,) {
    return this.projectsService.remove(id);
  }
}
