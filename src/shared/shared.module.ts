import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from "../modules/product/product.entity";
import { ProductService } from "../modules/product/product.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:
        process.env.NODE_ENV === "test"
          ? (configService: ConfigService) => ({
            type: "sqlite",
            database: configService.get("DATABASE_NAME_FOR_TEST"),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
          })
          : async (configService: ConfigService) => {
            return {
              type: "sqlite",
              database: configService.get("DATABASE_NAME_FOR_DEV"),
              entities: [__dirname + '/**/*.entity{.ts,.js}'],
              migrations: [__dirname + "/libs/shared/src/db-migrations/*{.ts,.js}"],
              synchronize: true,
            }
          },
    }),
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ProductService, Product],
  exports: [ProductService],
})
export class SharedModule { }
