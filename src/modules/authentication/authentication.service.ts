import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RegistrationStatus } from "./interfaces/regisration-status.interface";
import { LoginStatus } from "./interfaces/login-status.interface";
import { LoginUserDto } from "./dto/LoginUserDto";
import { JwtPayload } from "./interfaces/payload.interface";
import { IUser } from "../user/interfaces/IUser";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.usersService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<IUser> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: IUser): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user, {expiresIn: "1d"});
    
    return {
      expiresIn,
      accessToken,
    };
  }
}
