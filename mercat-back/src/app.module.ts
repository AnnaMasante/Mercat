import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { SellersModule } from './sellers/sellers.module';
import { PhotosModule } from './photos/photo.module';
import { AuthModule } from './auth/auth.module';
import { validateConfig } from './config/validateConfig';
import { MONGO_URL } from './config/variables';
import { OrdersModule } from './orders/orders.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: (config) => validateConfig(config),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get(MONGO_URL),
      }),
    }),
    ProductsModule,
    ClientsModule,
    SellersModule,
    PhotosModule,
    AuthModule,
    OrdersModule,
    SubscriptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
