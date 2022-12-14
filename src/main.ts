import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import flash = require('connect-flash');
import { join } from 'path';
import * as exphbs from 'express-handlebars';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
  await app.listen(3000);
}
bootstrap();
