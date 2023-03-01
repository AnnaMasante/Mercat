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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/roles.decorator';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';
import { CartDto } from './dto/cart.dto';
import { User } from '../auth/user.decorator';
import { Seller } from '../sellers/schemas/seller.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles('SELLER')
  create(@Body() createProductDto: CreateProductDto, @User() seller: Seller) {
    return this.productService.create(createProductDto, seller);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':idProduct/addComment')
  @Roles('CLIENT')
  addReview(
    @Param('idProduct') idProduct: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.productService.addReview(idProduct, createReviewDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Get(':nameProduct/:city')
  async getProductsByNameAndCity(
    @Param('nameProduct') nameProduct: string,
    @Param('city') city: string,
  ) {
    return this.productService.findProductsByNameAndCity(nameProduct, city);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get(':nameProduct')
  async getProductsByName(@Param('nameProduct') nameProduct: string) {
    return this.productService.findProductByName(nameProduct);
  }

  @Get(':sellerId/discounts')
  getSellerDiscounts(@Param('sellerId') sellerId: string) {
    return this.productService.getSellerDiscounts(sellerId);
  }

  @Post('/cart')
  getCartItems(@Body() cart: CartDto) {
    return this.productService.getCartItems(cart.productIds);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Roles('SELLER')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles('SELLER')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.productService.removeAll();
  }

  @Get(':idProduct/reviews')
  async getReviewsByProduct(@Param('idProduct') idProduct: string) {
    return this.productService.getReviewsByProduct(idProduct);
  }

  /*@Get(':idProduct/favorites')
  async getFavorites(@Param('idProduct') idProduct: string) {
    return this.productService.getFavorites(idProduct);
  }*/
}
