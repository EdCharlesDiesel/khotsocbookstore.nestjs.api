import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm.service';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './modules/database/database.module';
import { User } from "./modules/user/user.entity";
import { UserModule } from "./modules/user/user.module";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: '$ta99Ath0',
      database: 'khotsobookstore_database',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
