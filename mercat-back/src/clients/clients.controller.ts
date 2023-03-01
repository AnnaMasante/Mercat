import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schemas/client.schema';
import { Product } from '../products/schemas/product.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAddressDto } from '../addresses/dto/create-address.dto';
import { UpdateAddressDto } from '../addresses/dto/update-address.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @Roles('CLIENT')
  getProfile(@User() client: Client) {
    return this.clientsService.findOne(client._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idClient/:idProduct/favorites')
  @Roles('CLIENT')
  addFavorites(
    @Param('idClient') idClient: string,
    @Param('idProduct') idProduct: string,
  ) {
    return this.clientsService.addFavorites(idClient, idProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idClient/:idProduct/removeFavorites')
  @Roles('CLIENT')
  removeFavorites(
    @Param('idClient') idClient: string,
    @Param('idProduct') idProduct: string,
  ) {
    return this.clientsService.removeFavorites(idClient, idProduct);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':idClient/removeAllFavorites')
  @Roles('CLIENT')
  removeAllFavorites(@Param('idClient') idClient: string) {
    return this.clientsService.removeAllFavorites(idClient);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':idClient/favorites')
  @Roles('CLIENT')
  getFavorites(@Param('idClient') idClient: string) {
    return this.clientsService.getFavorites(idClient);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':idClient/password')
  @Roles('CLIENT')
  changePassword(
    @Param('idClient') idClient: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.clientsService.changePassword(idClient, changePasswordDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }
}
