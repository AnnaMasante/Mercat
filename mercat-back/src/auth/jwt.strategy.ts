import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { SellersService } from 'src/sellers/sellers.service';
import { JWT_SECRET } from 'src/config/variables';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JWT_SECRET)
    jwtSecret: string,
    private clientsService: ClientsService,
    private sellersService: SellersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    if (payload.sub && payload.access_token) {
      let user;
      if (payload.role === 'CLIENT') {
        user = await this.clientsService.findOne(payload.sub);
      } else if (payload.role === 'SELLER') {
        user = await this.sellersService.findOne(payload.sub);
      } else {
        throw new UnauthorizedException();
      }
      if (user) {
        const { password, ...userData } = user;
        return userData;
      }
    }
    throw new UnauthorizedException();
  }
}
