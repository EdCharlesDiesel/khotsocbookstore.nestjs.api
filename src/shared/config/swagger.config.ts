import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerOptions = new DocumentBuilder()
  .setTitle("KhotsoCBook Store API version 2.0.0")
  .setDescription("KhotsoCBookStore a API build using nestjs ")
  .setVersion("2.0.0")
  .setBasePath("/api")
  .setExternalDoc("For more information", "http://swagger.io")
  .addTag("books", "application for buying and reading books")
  .addTag("nestjs", "framework")
  //.addBearerAuth('Authorization', 'header', 'apiKey')
  .build();





