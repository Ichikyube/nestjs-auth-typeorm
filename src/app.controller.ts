import {
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Render,
  Request,
  Req,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  @Render('login')
  index(@Req() req): { message: string } {
    return { message: req.flash('loginError') };
  }
  @UseGuards(LoginGuard)
  @Post('/login')
  async login(@Res() res: Response) {
    return res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
  }

  @Get('/store')
  @Render('store')
  root() {
    return {};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    return req.logout(() => {
      res.redirect('/');
    });
  }
}
