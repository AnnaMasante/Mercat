import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':label/products')
  findProducts(@Param('label') label: string) {
    return this.productsService.findByCategory(label);
  }

  @Get(':label')
  findOne(@Param('label') label: string) {
    console.log(label);
    return this.categoryService.findOne(label);
  }

  @Delete(':label')
  remove(@Param('label') label: string) {
    return this.categoryService.remove(label);
  }

  @Delete()
  removeAll() {
    return this.categoryService.removeAll();
  }
}
