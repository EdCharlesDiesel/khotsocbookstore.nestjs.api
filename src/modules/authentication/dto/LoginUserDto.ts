import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class LoginUserDto {
  @IsNotEmpty()
  @ApiModelProperty()
  readonly username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}
