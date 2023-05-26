import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditCartDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  cartTotal: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  userId: string;
}
