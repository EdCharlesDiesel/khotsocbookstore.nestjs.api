import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { AuthorModule } from "./modules/author/author.module";
import { CartModule } from "./modules/cart/cart.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { OrderModule } from "./modules/order/order.module";
import { PaymentModule } from "./modules/payment/payment.module";
import { ShipmentModule } from "./modules/shipment/shipment.module";
import { OrderItemModule } from "./modules/order-Item/order-item.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { WishlistModule } from "./modules/wishList/wishlist.module";
import { ProductModule } from "./modules/product/product.module";
import { CategoryModule } from "./modules/category/category.module";

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
      autoLoadEntities: true
    }),
    AuthenticationModule,
    AuthorModule,
    CategoryModule,
    CustomerModule,
    CartModule,
    ProductModule,
    PaymentModule,
    OrderModule,
    OrderItemModule,
    ShipmentModule,
    UserModule,
    WishlistModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
