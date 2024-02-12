import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignupUserDto, LoginUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async signup(signupUserDto: SignupUserDto) {
    try {
      const { password, ...userData } = signupUserDto;
      const hashP = await bcrypt.hash( password, 9 );
      const user = this.userRepository.create({
        ...userData,
        password: hashP
      });
      await this.userRepository.save( user );
      delete user.password;
      return user;
    } catch (error) {
      this.handleDbError(error)
    } 
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    // Uso este metodo que me permite activar solo algunos valores del usuario
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }, select: {
        email: true, password: true, id: true
      }
    });
    if ( !user || !bcrypt.compareSync( password, user.password ))
      throw new UnauthorizedException('Credenciales no validas');
  }

  handleDbError(error: any) {
    if ( error.code === '23505') {
      throw new BadRequestException( error.detail )
    }
    throw new InternalServerErrorException(' Check server logs ')
  }


}
