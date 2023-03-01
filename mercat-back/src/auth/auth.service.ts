import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients/clients.service';
import { SellersService } from '../sellers/sellers.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private sellersService: SellersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(mail: string, pass: string, role: string): Promise<any> {
    let user = null;
    if (role == 'CLIENT') {
      user = await this.clientsService.findByMail(mail);
    } else if (role == 'SELLER') {
      user = await this.sellersService.findByMail(mail);
    }
    if (
      user &&
      (await this.passwordService.checkPassword(pass, user.password))
    ) {
      const { password, ...result } = user;
      return { ...result, role };
    }
    throw new NotFoundException('Wrong credentials');
  }

  async login(mail: string, pass: string, role: string) {
    const user = await this.validateUser(mail, pass, role);
    if (user) {
      return this.generateTokens(user, role);
    }
    return new BadRequestException('Unknown');
  }

  async generateTokens(user: any, role: string) {
    const accessTokenPayload = {
      sub: user._id,
      access_token: true,
      role: role,
    };
    const refreshTokenPayload = {
      sub: user._id,
      refresh_token: true,
      role: role ? role : user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        expiresIn: '7d',
      }),
    };
  }

  async refresh(refreshToken: string) {
    const data = await this.jwtService.verifyAsync<{
      sub: string;
      refresh_token?: boolean;
      role: string;
    }>(refreshToken);
    if (data.refresh_token) {
      let user;
      if (data.role === 'CLIENT') {
        user = await this.clientsService.findOne(data.sub);
      } else if (data.role === 'SELLER') {
        user = await this.sellersService.findOne(data.sub);
      }
      if (user) {
        return await this.generateTokens(user, data.role);
      }
    }
    throw new BadRequestException('The provided token is not a refresh token');
  }
}
