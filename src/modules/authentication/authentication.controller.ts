import { AuthenticationService } from './authentication.service';
import {
  Controller,
  Post,
  HttpStatus,
  Body,
  HttpException,

} from '@nestjs/common';
import {  ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { LoginUserDto } from './dto/LoginUserDto';
import { LoginStatus } from './interfaces/login-status.interface';

@ApiTags("Authentication")
@Controller('Authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,

  ) { }


  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authenticationService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authenticationService.login(loginUserDto);
  }
}
