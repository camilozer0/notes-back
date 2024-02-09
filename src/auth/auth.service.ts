import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  signup(signupUserDto: SignupUserDto) {
    return 'This action adds a new auth';
  }

  login(loginUserDto: LoginUserDto) {
    return 'This action adds a new auth';
  }


}
