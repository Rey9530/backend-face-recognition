import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { FORMAT_FECHA_YYYY_MM_DD } from 'src/common/const';

export class CodeEmployeDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha es incorrecta debe ser YYYY-mm-dd',
  })
  emp_fecha_nacimiento: string;

}
