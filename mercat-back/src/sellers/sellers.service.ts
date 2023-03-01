import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Seller, SellerDocument } from './schemas/seller.schema';
import { Model } from 'mongoose';
import { PasswordService } from 'src/auth/password.service';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name) private sellerModel: Model<SellerDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    const { password, ...sellerInfo } = createSellerDto;
    createSellerDto.password = await this.passwordService.hashPassword(
      password,
    );
    try {
      const { _id } = await new this.sellerModel(createSellerDto).save();
      return { _id, ...sellerInfo };
    } catch (err) {
      if (err.keyPattern) {
        throw new BadRequestException(err.keyPattern);
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return this.sellerModel.find().exec();
  }

  async findOne(id: string) {
    const seller = await this.sellerModel.findOne({ _id: id }).exec();
    if (seller) {
      const products = await this.productModel.find({
        'seller.id': seller._id,
      });
      const { password, ...sellerInfo } = seller.toObject();
      return { ...sellerInfo, products };
    }
    throw new NotFoundException();
  }

  async findByMail(mail: string) {
    const seller = await this.sellerModel.findOne({ mail: mail }).exec();
    if (seller) {
      return seller.toObject();
    }
    throw new NotFoundException();
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    const dbSeller = await this.sellerModel.findOne({ _id: id }).exec();
    if (!dbSeller) {
      throw new BadRequestException('This id does not exists');
    }
    if (updateSellerDto.password) {
      updateSellerDto.password = await this.passwordService.hashPassword(
        updateSellerDto.password,
      );
    }
    const res = await this.sellerModel
      .updateOne({ _id: id }, updateSellerDto)
      .exec();
    return res;
  }

  async remove(id: string) {
    const res = await this.sellerModel.deleteOne({ _id: id });
    if (res.deletedCount == 1) {
      return true;
    }
    throw new NotFoundException();
  }
}
