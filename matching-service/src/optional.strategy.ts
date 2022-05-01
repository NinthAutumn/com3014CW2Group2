// import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { JwtPayload } from './dto/jwt-payload.dto.t';
import { Strategy } from 'passport-anonymous';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // Override handleRequest so it never throws an error
  handleRequest(err, user, info, context) {
    return user;
  }
}
