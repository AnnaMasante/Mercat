import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    let category = await this.findOne(createCategoryDto.label);
    if (category != null) {
      throw new BadRequestException(
        `The category ${createCategoryDto.label} already exists`,
      );
    }
    category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(label: string) {
    const category = await this.categoryModel.findOne({ label: label }).exec();
    return category;
  }

  async remove(label: string) {
    const res = await this.categoryModel.deleteOne({ label: label });
    console.log(res);
    if (res.deletedCount == 1) {
      return true;
    }
    throw new NotFoundException();
  }

  async removeAll() {
    const res = await this.categoryModel.deleteMany();
    return res;
  }
}
