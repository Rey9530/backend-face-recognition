import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    user_code: string;

    @ApiProperty({})
    @IsString()
    @MinLength(1)
    password: string;
}
