import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  order_id: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  order_date: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  total_price?: number;
}
