import * as crypto from 'crypto';
import { AuthenticationService } from './authentication.service';
import {
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Res,
  Body,
  HttpException,
  UseGuards,
  Get,
  Req
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthenticationDto } from './dto/authentication.dto';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { LoginUserDto } from './dto/LoginUserDto';
import { LoginStatus } from './interfaces/login-status.interface';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './interfaces/payload.interface';

@ApiTags("Authentication")
@Controller('Authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService
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

  @Get('whoami')
  //@UseGuards(AuthGuard())
  @ApiBearerAuth('defaultBearerAuth')
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
