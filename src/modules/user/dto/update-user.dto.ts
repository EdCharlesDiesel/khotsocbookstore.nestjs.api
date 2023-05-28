import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsDate,
  IsDefined,
} from 'class-validator';
import {
  ApiModelProperty,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class UpdateUserDto {


  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()

  id: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public email: string;

  @Length(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public password: string;

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
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public idNumber: string;


  @IsDate()
  @ApiModelProperty()
  public birthday: Date;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public role: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  public subscription: string;
}
