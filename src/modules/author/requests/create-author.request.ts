import {
  IsEmail,
  IsNotEmpty,
  IsDefined,
  IsString,
} from 'class-validator';
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { IAuditEntity } from "../../../common/intefaces/IAuditEntity";

export class CreateAuthorRequest implements IAuditEntity{
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
  createdBy: string;
  createdOn: Date;
  deletedAt: Date;
  deletedBy: string;
  updatedBy: string;
  updatedOn: Date;
}
