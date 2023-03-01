import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule } from '../clients/clients.module';
import { SellersModule } from '../sellers/sellers.module';
import { PasswordService } from './password.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/variables';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    forwardRef(() => ClientsModule),
    forwardRef(() => SellersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config) => ({
        signOptions: { expiresIn: '30m' },
        secret: config.get(JWT_SECRET),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,
    {
      provide: JWT_SECRET,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get(JWT_SECRET),
    },
  ],
  exports: [PasswordService],
})
export class AuthModule {}
