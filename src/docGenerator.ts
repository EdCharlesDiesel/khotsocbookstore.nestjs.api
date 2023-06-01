import * as fs from 'fs-extra';
import * as path from 'path';
import * as process from 'process';
import { NestFactory } from '@nestjs/core';
import {  SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerOptions } from './shared/config/swagger.config';

async function writeDoc() {
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, swaggerOptions);

    fs.ensureDirSync(path.join(process.cwd(), 'dist'));
    fs.writeJsonSync(
        path.join(process.cwd(), 'dist', 'api-doc.json'),
        document,
        { spaces: 2 }
    );
}

writeDoc().then(() => console.log('Swagger Document written!'));
