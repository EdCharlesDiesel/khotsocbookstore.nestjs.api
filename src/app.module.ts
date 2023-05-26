import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { AuthorModule } from "./modules/author/author.module";
import { BookModule } from "./modules/book/book.module";
import { CartModule } from "./modules/cart/cart.module";

@Module({
  imports: [
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
    UserModule,
    AuthorModule,
    BookModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
