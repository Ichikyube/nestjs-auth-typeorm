"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const flash = require("connect-flash");
const path_1 = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('SERVER_POR') || 3000;
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 360000 },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    const viewsPath = (0, path_1.join)(__dirname, '../public/views');
    app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
    app.set('views', viewsPath);
    app.set('view engine', '.hbs');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setDescription('API docs')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, async () => {
        console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map