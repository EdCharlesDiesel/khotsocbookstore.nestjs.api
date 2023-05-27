import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import JwtStrategy from "./strategy/jwt.strategy";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({})],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy]
})
export class AuthenticationModule {
}
