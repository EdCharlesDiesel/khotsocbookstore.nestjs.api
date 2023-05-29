import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  payment_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  payment_method?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  payment_date: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  amount: number;
}
