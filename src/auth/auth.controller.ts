import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, SignupUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signupUser(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUseDto: LoginUserDto) {
    return this.authService.login(loginUseDto);
  }


  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute() {
    return 'hola mundo privateks'
  }


}
