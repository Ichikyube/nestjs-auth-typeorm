"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const flash = require("connect-flash");
const path_1 = require("path");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map