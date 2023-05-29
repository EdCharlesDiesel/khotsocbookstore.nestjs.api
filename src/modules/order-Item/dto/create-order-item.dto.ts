import {
  IsDate,
   IsNumber,
  IsOptional,
  } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {


  @IsDate()
  @IsOptional()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price?: number;


}
