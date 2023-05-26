import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import {
  ApiModelPropertyOptional
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateAuthorRequest {
  @IsNotEmpty()
  @IsString()
  @ApiModelPropertyOptional()
  public id: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiModelPropertyOptional()
  public firstName: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiModelPropertyOptional()
  public lastName: string;
}
