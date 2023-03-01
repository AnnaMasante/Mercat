import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordService } from 'src/auth/password.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientDocument } from './schemas/client.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateAddressDto } from '../addresses/dto/create-address.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const { password, ...sellerInfo } = createClientDto;
    createClientDto.password = await this.passwordService.hashPassword(
      password,
    );
    try {
      const { _id } = await new this.clientModel(createClientDto).save();
      return { _id, ...sellerInfo };
    } catch (err) {
      if (err.keyPattern) {
        throw new BadRequestException(err.keyPattern);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.clientModel.find().exec();
  }

  async findOne(id: string) {
    const client = await this.clientModel.findOne({ _id: id }).exec();
    if (client) {
      const { password, ...clientInfo } = client.toObject();
      return clientInfo;
    }
    throw new NotFoundException();
  }

  async findByMail(mail: string) {
    const client = await this.clientModel.findOne({ mail: mail }).exec();
    if (client) {
      return client.toObject();
    }
    throw new NotFoundException();
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    if (updateClientDto.password) {
      throw new BadRequestException("This route can't update password");
    }
    const dbClient = await this.clientModel.findOne({ _id: id });
    if (dbClient) {
      for (const prop in updateClientDto) {
        dbClient[prop] = updateClientDto[prop];
      }
      return await dbClient.save();
    } else {
      throw new NotFoundException('This id does not exist');
    }
  }

  async remove(id: string) {
    const res = await this.clientModel.deleteOne({ _id: id });
    if (res.deletedCount == 1) {
      return true;
    }
    throw new NotFoundException();
  }

  async addFavorites(idClient: string, idProduct: string) {
    const client = await this.clientModel.findOne({ _id: idClient }).exec();
    if (client == null) {
      throw new NotFoundException('The client was not found');
    } else {
      client.favorites.push(idProduct);
      return await client.save();
    }
  }

  async removeFavorites(idClient: string, idProduct: string) {
    const client = await this.clientModel.findOne({ _id: idClient }).exec();
    if (client == null) {
      throw new NotFoundException('The client was not found');
    } else {
      const index = client.favorites.indexOf(idProduct);
      client.favorites.splice(index, 1);
      return await client.save();
    }
  }

  async removeAllFavorites(idClient: string) {
    const client = await this.clientModel.findOne({ _id: idClient });
    if (client == null) {
      throw new NotFoundException('The client was not found');
    } else {
      client.favorites.splice(0, client.favorites.length);
      return await client.save();
    }
  }
  async getFavorites(idClient: string) {
    const products = await this.clientModel
      .findOne({ _id: idClient }, 'favorites')
      .populate('favorites')
      .exec();
    if (products) {
      return products.favorites;
    }
    throw new NotFoundException();
  }

  async changePassword(idClient: string, changePasswordDto: ChangePasswordDto) {
    const client = await this.clientModel.findOne({ _id: idClient });
    if (client) {
      if (
        await this.passwordService.checkPassword(
          changePasswordDto.oldPassword,
          client.password,
        )
      ) {
        client.password = await this.passwordService.hashPassword(
          changePasswordDto.newPassword,
        );
        client.save();
        return true;
      } else {
        throw new BadRequestException('The provided password is not valid');
      }
    }
    throw new NotFoundException('The provided id does not match a client.');
  }
}
