import {
  IsNotEmpty,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code?: string;

}
