import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from './schemas/subscription.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}
  create(createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = new this.subscriptionModel(createSubscriptionDto);
    return subscription.save();
  }

  findAll() {
    return this.subscriptionModel.find().exec();
  }

  async findOne(id: number) {
    const subscription = await this.subscriptionModel
      .findOne({ _id: id })
      .exec();
    return subscription;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.subscriptionModel.findOne({ _id: id });
    if (subscription) {
      for (const prop in updateSubscriptionDto) {
        subscription[prop] = updateSubscriptionDto[prop];
      }
      return await subscription.save();
    }
    throw new NotFoundException();
  }

  async remove(id: number) {
    const res = await this.subscriptionModel.deleteOne({ _id: id });
    return res;
  }
}
