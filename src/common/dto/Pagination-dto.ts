import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { FORMAT_FECHA_YYYY_MM_DD } from 'src/common/const';

export class PaginationDto {
  @ApiProperty()
  @IsString() 
  page: string;


  @ApiProperty()
  @IsString() 
  quantity: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  query: string;


  @ApiProperty()
  @IsString()
  @IsOptional()
  company: string;

}
