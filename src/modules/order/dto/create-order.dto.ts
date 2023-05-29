import {
  IsDate,
   IsNumber,
  IsOptional,
  } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @IsDate()
  @IsOptional()
  @ApiProperty()
  order_date: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  total_price?: number;


}
