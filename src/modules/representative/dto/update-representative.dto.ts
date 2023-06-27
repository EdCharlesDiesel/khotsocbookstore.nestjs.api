import {
  IsNotEmpty,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRepresentativeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image?: string;
}
