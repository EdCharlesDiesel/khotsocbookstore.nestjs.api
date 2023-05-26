import {
 IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  cartTotal: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  userId: string;
}
