import {
  IsNotEmpty,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRepresentativeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image?: string;

}
