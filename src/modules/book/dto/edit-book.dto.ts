import {
  IsDate,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EditBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  publishedDate?: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  retailPrice: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  coverFileName: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  cost: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  userId: string;
}
