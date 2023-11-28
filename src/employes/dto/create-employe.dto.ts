import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsUUID, Matches, MinLength } from 'class-validator';

export class CreateEmployeDto {
  @ApiProperty({})
  @IsString()
  @MinLength(4)
  emp_codigo: string;

  @ApiProperty() 
  @IsString()
  @MinLength(4) 
  @Matches(/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/ , { message:'La fecha es incorrecta debe ser dd-mm-YYYY'})
  emp_fecha_nacimiento: Date;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  emp_nombres: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  emp_apellidos: string;

  @ApiProperty()
  @IsUUID('all',{message:'La empresa es incorrecta'})
  marca_emp_empre: string;

  @ApiProperty()
  @IsUUID('all',{message:'El género es incorrecto'})
  marca_emp_gen:string;

  @ApiProperty()
  @IsUUID('all',{message:'La ubicación es incorrecta'})
  marca_emp_ubi:string;

  @ApiProperty()
  @IsUUID('all',{message:'El tipo de contratación es incorrecta'})
  marca_emp_cn:string;
}
