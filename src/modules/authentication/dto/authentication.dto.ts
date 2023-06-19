import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  emailAddress: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
