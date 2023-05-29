import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  order_item_id: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  price?: number;
}
