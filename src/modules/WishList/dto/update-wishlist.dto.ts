import {
  IsNotEmpty,
  IsString
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateWishlistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  wishlist: string;


}
