import { Module } from '@nestjs/common';
import { userProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [userProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
