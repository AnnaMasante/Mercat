import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/client/login')
  @HttpCode(200)
  loginClient(@Body() credentials: LoginDto) {
    return this.authService.login(
      credentials.mail,
      credentials.password,
      'CLIENT',
    );
  }

  @Post('/seller/login')
  @HttpCode(200)
  loginSeller(@Body() credentials: LoginDto) {
    return this.authService.login(
      credentials.mail,
      credentials.password,
      'SELLER',
    );
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto.refresh_token);
  }
}
