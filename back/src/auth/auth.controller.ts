import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dtos';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDTO: SignInDto) {
    return this.authService.signIn(signInDTO.nickname, signInDTO.password);
  }

  @Post('signup')
  signUp(@Body() signInDTO: SignInDto) {
    return this.authService.signUp(signInDTO.nickname, signInDTO.password);
  }

  @Get('test')
  @UseGuards(AuthGuard)
  test() {
    return { message: 'You are authorized!' };
  }
}
