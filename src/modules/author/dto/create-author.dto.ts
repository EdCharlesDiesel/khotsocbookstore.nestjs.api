import {
  IsNotEmpty,
  IsDefined,
  IsString, IsOptional
} from "class-validator";
import {
  ApiModelProperty,
  ApiModelPropertyOptional
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public firstName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @ApiModelPropertyOptional()
  public bookAuthored: string;

}
