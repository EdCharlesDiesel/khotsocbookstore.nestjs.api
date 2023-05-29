import {
  IsEmail,
  IsNotEmpty, IsNumber,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCustomerDto {
   @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  phone_number: number;
}
