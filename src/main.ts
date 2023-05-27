import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {  SwaggerModule } from "@nestjs/swagger";
import { swaggerOptions } from "./shared/config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}

bootstrap().then(() => console.log("application running...."));
