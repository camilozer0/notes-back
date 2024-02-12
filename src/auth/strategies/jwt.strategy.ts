import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy ( Strategy ) {

    // Hago todo esto porque estoy creando una validacion personalizada
    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            // Para configurar en donde voy a enviar el token, en este caso como un bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    // Por defecto usaria la validacion interna

    // Este codigo se implementa si el token pasa las validaciones
    // Extiste, todavia no ha expirado y hace emparejamiento con el payload
    async validate( payload: JwtPayload ): Promise<User> {

        const { id, email } = payload;
        const user = await this.userRepository.findOneBy({ email });
        if ( !user ) throw new UnauthorizedException('Token not valid');

        return user
    }


}