import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('POSTGRES_HOST'),
    //     port: configService.get('POSTGRES_PORT'),
    //     username: configService.get('POSTGRES_USER'),
    //     password: configService.get('POSTGRES_PASSWORD'),
    //     database: configService.get('POSTGRES_DB'),
    //     entities: [
    //       __dirname + '/../**/*.entity.ts',
    //     ],
    //     synchronize: true,
    //   })
    // }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      autoLoadEntities: true
    }),
  ],
})
export class DatabaseModule { }
