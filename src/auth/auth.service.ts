import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignupUserDto, LoginUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    // Iyecto el repositorio y lo uso con la entidad usuario
    // Esta es la capa de persistencia, conexion con la base de datos
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async signup(signupUserDto: SignupUserDto) {
    try {
      const { password, ...userData } = signupUserDto;
      // Encripto el password antes de enviarlo a la base de datos
      const hashP = await bcrypt.hash( password, 9 );
      // Hago la creacion del usuario
      const user = this.userRepository.create({
        ...userData,
        password: hashP
      });
      // Salvo el usuario en la base de datos
      await this.userRepository.save( user );
      // Borro el password del usuario que guarde en la base de datos.
      delete user.password;
      // Devuelvo el usuario al frontend
      return {
        ...user, 
        token: this.getJwt({ id: user.id, email: user.email  })
      }
    } catch (error) {
      this.handleDbError(error)
    } 
  }

  async login(loginUserDto: LoginUserDto) {
    // Hago la extraccion del email y el password para usarlos
    const { email, password } = loginUserDto;
    // Uso este metodo que me permite activar solo algunos valores del usuario
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }, select: {
        // Solo recibo esta informacion del usuario
        email: true, password: true, id: true
      }
    });
    // Verifico que el usuario existe y que la contrasena sea igual
    if ( !user || !bcrypt.compareSync( password, user.password ))
      throw new UnauthorizedException('Credenciales no validas');
    return {
      ...user, 
      token: this.getJwt({ id: user.id, email: user.email  })
    }
  }

  // Para generar el token
  private getJwt( payload: JwtPayload) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  handleDbError(error: any) {
    if ( error.code === '23505') {
      throw new BadRequestException( error.detail )
    }
    throw new InternalServerErrorException(' Check server logs ')
  }


}
