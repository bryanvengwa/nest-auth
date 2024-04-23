import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET || '4B+H+Np+J7Ia1VqXbApbbnqbNnO7PSzRRLvzRFndaapRvHaVHTz1R257eNhEPSghQQvJWhBmthjjba0hSt8zlpYH3MT2OhRcZPa0UOVVUum7udoaSWrO0KpCMzjkOx5yemojSf1i9I2x9fYU/WsI23MtBUMtezf+bJ8D0NMCU5iQEpg4wWQGpwR6VU0SkiVgNcKJD9Q6YgJTOMlyu1zkT63xtYXvotZye0LsbukDcAf+kj/HS99KPkZ3YXFp8mgM40ETTH37C4UiAU6X8c+ZOhKgdbHTeF5EoePL8uKnQKKy3lhHli0OJBJKDIWd8Rn7pwd/6n5+E6kR',
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}