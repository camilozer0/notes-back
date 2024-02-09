import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignupUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hash, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async signup(signupUserDto: SignupUserDto) {
    try {
      const { password, ...userData } = signupUserDto;
      const hashP = await hash( password, 9 );
      const user = this.userRepository.create({
        ...userData,
        password: hashP
      });
      await this.userRepository.save( user )
      return user;
    } catch (error) {
      this.handleDbError(error)
    } 
  }

  login(loginUserDto: LoginUserDto) {
    return 'This action adds a new auth';
  }

  handleDbError(error: any) {
    if ( error.code === '23505') {
      throw new BadRequestException( error.detail )
    }
    throw new InternalServerErrorException(' Check server logs ')
  }


}
