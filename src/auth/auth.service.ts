import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async signup(signupUserDto: SignupUserDto) {
    try {
      const { password, ...userDto } = signupUserDto;
      const hashPw = await hash(password, 9);
      const userToSave = {hashPw, ...userDto };
      this.userRepository.create( userToSave );
      this.userRepository.save( userToSave )
      return userToSave;
    } catch (error) {
      console.log(error)
    }
    
  }

  login(loginUserDto: LoginUserDto) {
    return 'This action adds a new auth';
  }


}
