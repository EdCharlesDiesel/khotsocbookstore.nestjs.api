import {
  IsBoolean,
  IsEmail,
  IsNotEmpty, IsNumber,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Country } from "src/modules/country/country.entity";
import { Representative } from "src/modules/representative/representative.entity";

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customer_id: string;
  
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
  emailAddress: string;  

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  phone_number: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  company?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  date?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  status?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  activity?: number;
  
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  verified?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  balance?: number;

  @ApiProperty({type: Representative})  
  representative?: Representative;

  @ApiProperty({type: Country})
  country?: Country;
}
