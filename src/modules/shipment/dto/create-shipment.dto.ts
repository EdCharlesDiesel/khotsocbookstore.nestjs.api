import {
  IsDate,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateShipmentDto {
  @IsDate()
  @IsOptional()
  @ApiProperty()
  shipment_date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  province: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  country: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  zip_code: string;


}
