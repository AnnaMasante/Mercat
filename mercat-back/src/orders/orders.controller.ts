import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/auth/user.decorator';
import { Client } from 'src/clients/schemas/client.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles.decorator';
import { identity } from 'rxjs';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles('CLIENT')
  order(@Body() createOrderDto: CreateOrderDto, @User() client: Client) {
    return this.ordersService.create(createOrderDto, client._id);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('clients/:id')
  @Roles('CLIENT')
  findClientOrders(@Param('id') id: string) {
    return this.ordersService.findClientOrders(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sellers/:id')
  @Roles('SELLER')
  findSellersOrders(@Param('id') id: string) {
    return this.ordersService.findSellerOrders(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':orderId')
  @Roles('SELLER')
  update(@Param('orderId') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
