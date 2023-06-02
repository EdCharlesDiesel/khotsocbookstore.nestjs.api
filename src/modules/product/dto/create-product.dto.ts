import {
  IsNotEmpty, IsNumber,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  SKU: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stock: number;
}
