import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { EmployesModule } from './employes/employes.module';
import { ProjectsModule } from './projects/projects.module';
import { MarkingsModule } from './markings/markings.module';
import { SeedModule } from './seed/seed.module'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type:'postgres',
    //   host:process.env.DB_HOST,
    //   port: +process.env.DB_PORT,
    //   database:process.env.DB_NAME,
    //   username:process.env.DB_USERNAME,
    //   password:process.env.DB_PASSWORD,
    //   autoLoadEntities:true,
    //   synchronize:false,
    // }),
    CompaniesModule,
    UsersModule,
    EmployesModule,
    ProjectsModule,
    MarkingsModule,
    SeedModule,  
  ],
})
export class AppModule { }
