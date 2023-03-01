import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { Review, ReviewSchema } from '../reviews/schemas/reviews.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoriesController } from './category.controller';
import { CategoryService } from './category.service';
import { Seller, SellerSchema } from '../sellers/schemas/seller.schema';
import { SellersModule } from '../sellers/sellers.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }]),
    SellersModule,
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService, CategoryService],
  exports: [ProductsService],
})
export class ProductsModule {}
