import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Khotso C Book Store API version 2.0.0")
    .setDescription("This is version 2.0.0")
    .setVersion("2.0.0")
    .addTag("Book")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(8080);
}

bootstrap().then(() => console.log("application running...."));
