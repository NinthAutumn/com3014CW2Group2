import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppService } from './app.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// import { JwtPayload } from './dto/jwt-payload.dto.t';
import { config } from 'dotenv';
import { JwtPayloadDTO } from './dto/jwt-payload.dto';
config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AppService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDTO) {
    return payload;
  }
}
