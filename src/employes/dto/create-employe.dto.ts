import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateEmployeDto {
  @ApiProperty({})
  @IsString()
  @MinLength(4)
  emp_codigo: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
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
  @IsUUID()
  marca_emp_empre_fk: string;

  @ApiProperty()
  @IsUUID()
  marca_emp_gen_fk:string;

  @ApiProperty()
  @IsUUID()
  marca_emp_ubi_fk:string;

  @ApiProperty()
  @IsUUID()
  marca_emp_cn_fk:string;
}
