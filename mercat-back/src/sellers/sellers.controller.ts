import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Roles } from 'src/auth/guards/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { Seller } from './schemas/seller.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Subscription } from '../subscriptions/schemas/subscription.schema';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  findAll() {
    return this.sellersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @Roles('SELLER')
  getProfile(@User() seller: Seller) {
    return this.sellersService.findOne(seller._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
