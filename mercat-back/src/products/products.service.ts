import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';
import { Review, ReviewDocument } from '../reviews/schemas/reviews.schema';
import { Seller } from '../sellers/schemas/seller.schema';
import { SellersService } from '../sellers/sellers.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private readonly sellerService: SellersService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    seller: Seller,
  ): Promise<Product> {
    const products = (await this.sellerService.findOne(seller._id)).products;
    if (products.length < seller.subscription.max_product) {
      const createdProduct = new this.productModel({
        ...createProductDto,
        created_at: Date.now(),
      });
      return createdProduct.save();
    }
    throw new ForbiddenException();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate('seller', 'store description')
      .exec();
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findOne({ _id: id })
      //   .populate({ path: 'reviews', populate: 'clients' })
      .exec();
    if (product) {
      console.log(product);
      return product;
    }
    throw new NotFoundException();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    const product = await this.productModel.findById(id);
    if (product) {
      if (updateProductDto.discounts) {
        let invalidDiscount = false;
        if (product.discounts) {
          product.discounts.map((discount) => {
            if (discount.ending > updateProductDto.discounts[0].beginning) {
              console.log(discount.ending);
              invalidDiscount = true;
            }
          });
          if (invalidDiscount) {
            throw new ForbiddenException(
              'You cannot add this discount, there is already one at this date',
            );
          }
          product.discounts.push(updateProductDto.discounts[0]);
        }
      }
      for (const prop in updateProductDto) {
        product[prop] = updateProductDto[prop];
      }
      try {
        return await product.save();
      } catch (err) {
        if (err.kind === 'min' && err.path === 'quantity') {
          throw new BadRequestException({ quantity: -1 });
        }
        throw new InternalServerErrorException();
      }
    }
    throw new NotFoundException();
  }

  async remove(id: string) {
    const res = await this.productModel.deleteOne({ _id: id });
    if (res.deletedCount == 1) {
      return true;
    }
    throw new NotFoundException();
  }

  async removeAll() {
    const res = await this.productModel.deleteMany();
  }

  async addReview(idProduct: string, createReviewDto: CreateReviewDto) {
    const product = await this.productModel.findOne({ _id: idProduct }).exec();
    if (product) {
      const review = new this.reviewModel({
        ...createReviewDto,
        created_at: Date.now(),
      });
      product.reviews.push(review);
      return await product.save();
    } else {
      throw new NotFoundException();
    }
  }

  async getReviewsByProduct(idProduct: string) {
    try {
      const product = await this.productModel
        .findOne({ _id: idProduct })
        .populate('client', 'firstname')
        .exec();
      return product.reviews;
    } catch (e) {
      throw new NotFoundException();
    }
  }
  async findProductsByNameAndCity(nameProduct: string, city: string) {
    const products = await this.productModel
      .find({
        name: { $regex: new RegExp('^' + nameProduct, 'i') },
        city: { $regex: new RegExp('^' + city, 'i') },
      })
      .exec();
    return products;
  }

  async findProductByName(nameProduct: string) {
    const products = await this.productModel
      .find({
        name: { $regex: new RegExp('^' + nameProduct, 'i') },
      })
      .exec();
    return products;
  }

  async findByCategory(label: string) {
    return await this.productModel.find({ category: label }).exec();
  }

  async getCartItems(productIds: string[]) {
    return this.productModel
      .find({ _id: { $in: productIds } })
      .select('-reviews');
  }

  async getSellerDiscounts(sellerId: string) {
    const seller = await this.sellerService.findOne(sellerId);
    const products: Product[] = [];
    //TODO : Modifier la manière de sélection des produits en promo
    seller.products.map((product: Product) => {
      if (product.discounts.length !== 0) {
        products.push(product);
      }
    });
    return products;
  }
}
