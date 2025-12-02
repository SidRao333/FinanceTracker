import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { jwt } from 'zod';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("signup")
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("signin")
  login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @Get("protected")
  getAll(@Request() req) {
    return {message: `This is protected route. Your user id is ${req.user.id}`};
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  refreshToken(@Request() req) {
    return this.authService.refreshTokens(req.user.id, req.user.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post("signout")
  signOut(@Request() req) {
    return this.authService.signOut(req.user.id)
  }
}

  