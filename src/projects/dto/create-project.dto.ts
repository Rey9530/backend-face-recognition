import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { FORMAT_FECHA_YYYY_MM_DD } from 'src/common/const';

export class CreateProjectDto {
  @ApiProperty({})
  @IsString()
  @MinLength(4)
  proy_nombre: string;
  @ApiProperty({})
  @IsString()
  @MinLength(4)
  proy_numero_contrato: string;
  @ApiProperty()
  @IsString()
  @MinLength(4) 
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha de inicio es incorrecta debe ser  YYYY-mm-dd',
  })
  proy_fecha_inicio: string;
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @Matches(FORMAT_FECHA_YYYY_MM_DD, {
    message: 'La fecha de fin incorrecta debe ser YYYY-mm-dd',
  })
  proy_fecha_fin: string;

  @ApiProperty()
  @IsUUID('all', { message: 'La empresa seleccionada no es valida' })
  marca_proy_empre: string;
}
