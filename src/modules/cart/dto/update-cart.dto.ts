import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCartDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cart_id: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  quantity: number;
}
