import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { FORMAT_FECHA_YYYY_MM_DD } from 'src/common/const';

export class CreateEmployeDto {
  @ApiProperty({})
  @IsString()
  @MinLength(4)
  emp_codigo: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha es incorrecta debe ser YYYY-mm-dd',
  })
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
  @IsUUID('all', { message: 'La empresa es incorrecta' })
  marca_emp_empre: string;

  @ApiProperty()
  @IsUUID('all', { message: 'El género es incorrecto' })
  marca_emp_gen: string;

  @ApiProperty()
  @IsUUID('all', { message: 'La ubicación es incorrecta' })
  marca_emp_ubi: string;

  @ApiProperty()
  @IsUUID('all', { message: 'El tipo de contratación es incorrecta' })
  marca_emp_cn: string;


  @ApiProperty()
  @IsUUID('all', { message: 'El proyecto es incorrecto' })
  @IsOptional()
  marca_asig_proy: string;
}
