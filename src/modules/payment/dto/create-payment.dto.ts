import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  payment_method?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  payment_date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  amount: number;


}
