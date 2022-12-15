import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import flash = require('connect-flash');
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_POR') || 3000;

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 360000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  const viewsPath = join(__dirname, '../public/views');
  app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
  //app.engine('hbs', require('exphbs'));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}/api`,
    );
  });
}
bootstrap();
