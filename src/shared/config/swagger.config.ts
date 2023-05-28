import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerOptions = new DocumentBuilder()
  .setTitle("KhotsoCBookStore API version 2.0.0")
  .setDescription("KhotsoCBookStore API V2 an API built using nestjs and postgres as the database.")
  .setVersion("2.0.0")
  .setBasePath("/api")
  .addBearerAuth()
  .setExternalDoc("For more information", "https://github.com/EdCharlesDiesel/khotsocbookstore.nestjs.api")
  .addTag("Authentication", "Authentication end-point.")
  .addTag("Author", "end-point with CRUD function and more.")
  .addTag("Book", "end-point with CRUD functions and more.")
  .addTag("Cart", "end-point with CRUD functions and more.")
  .addTag("User", "end-point with CRUD functions and more.")

  //.addBearerAuth('Authorization', 'header', 'apiKey')
  .build();





