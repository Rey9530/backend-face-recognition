import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { MarcaEmpreEmpresas } from './entities/company.entity';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/common/services';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService,PrismaService],
  imports: [
    // TypeOrmModule.forFeature([MarcaEmpreEmpresas]),
    UsersModule
  ]
})
export class CompaniesModule { }
