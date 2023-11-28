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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/users/decorators';
import { marca_usr_usuario } from '@prisma/client';

@ApiTags('Projects')
@Auth()
@Controller('v1/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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
