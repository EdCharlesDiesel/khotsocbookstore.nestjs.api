import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";

/*
 the package provides the Passport Strategy class
 that you extend when creating your own Passport
 Strategy to be used for authenticating users in your
 application. For any custom strategy you create, you
 have to provide the Passport Strategy class in the
 AuthModule so that @nestjs/passport is aware of it,
 to pass over to the Passport.js middleware later.


 Imports the UsersModule to enable the use of UsersService.
 Imports the PassportModule provided by @nestjs/passport package.
 It also configures this module by explicitly
 specifying the default strategy to use to authenticate
 users, in this case, it's the jwt strategy.
 Imports the JwtModule provided by @nestjs/jwt package.
 This module provides utility functions related to JWT authentication.
 The only function you're interested in from this
 module is the sign() function that you'll use to sign the tokens with.
 The module requires setting the JWT expiry time and the secret code that's used to sign the token.
 Provides the JwtStrategy class. The implementation of this class will be discussed very shortly.
 Exports the PassportModule and JwtModule so that other modules in the
 application can import the AuthModule and make use of the AuthGuard()
 decorator to protect Route Handlers or entire Controllers

 */
@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    ConfigModule,
    JwtModule.register({
      secret:`${process.env.JWT_SECRET}`, signOptions: {
        expiresIn:`${process.env.EXPIRESIN}`,
      },
    }),
],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [
    PassportModule,
    JwtModule
  ],
})
export class AuthenticationModule {
}
