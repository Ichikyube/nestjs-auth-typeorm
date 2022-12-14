import {
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Render,
  Request,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LoginGuard)
  @Post('/login')
  async login(@Res() res: Response) {
    return res.redirect('/home');
  }

  @Get('/')
  @Render('login')
  index(@Req() req) {
    return { message: req.flash('loginError') };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user };
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
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
}
