import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerOptions = new DocumentBuilder()
  .setTitle("KhotsoCBook Store API version 2.0.0")
  .setDescription("KhotsoCBookStore a API built using nestjs ")
  .setVersion("2.0.0")
  .setBasePath("/api")
  .addBasicAuth()
  .setExternalDoc("For more information", "https://github.com/EdCharlesDiesel/khotsocbookstore.nestjs.api")
  .addTag("authors", "application for buying and reading books")
  .addTag("books", "application for buying and reading books")
  .addTag("carts", "End-point to manipulate the cart")
  .addTag("user", "End-point to manipulate the users")

  //.addBearerAuth('Authorization', 'header', 'apiKey')
  .build();





