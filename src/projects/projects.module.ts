import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from 'src/common/services';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService,PrismaService],
  imports: [UsersModule]
})
export class ProjectsModule { }
