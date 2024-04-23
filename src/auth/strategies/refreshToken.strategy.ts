import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET || '4B+H+Np+J7Ia1VqXbApbbnqbNnO7PSzRRLvzRFndaapRvHaVHTz1R257eNhEPSghQQvJWhBmthjjba0hSt8zlpYH3MT2OhRcZPa0UOVVUum7udoaSWrO0KpCMzjkOx5yemojSf1i9I2x9fYU/WsI23MtBUMtezf+bJ8D0NMCU5iQEpg4wWQGpwR6VU0SkiVgNcKJD9Q6YgJTOMlyu1zkT63xtYXvotZye0LsbukDcAf+kj/HS99KPkZ3YXFp8mgM40ETTH37C4UiAU6X8c+ZOhKgdbHTeF5EoePL8uKnQKKy3lhHli0OJBJKDIWd8Rn7pwd/6n5+E6kR',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };

  }}