import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import { SoldProduct } from 'src/products/schemas/soldProduct.schema';
import { CartItem, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  getTotal(cart: CartItem[]) {
    return cart.reduce((count, curItem) => {
      return count + curItem.product.price * curItem.amount;
    }, 0);
  }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    if (createOrderDto.items.length === 0) {
      return new BadRequestException({ items: 'empty' });
    }
    let sellerIdArray: string[] = [];
    let sortedCartPerSeller: CartItem[][] = [];
    createOrderDto.items.map((item) => {
      const index = sellerIdArray.findIndex(
        (sellerId) => sellerId === item.product.seller.id,
      );
      if (index === -1) {
        sellerIdArray.push(item.product.seller.id);
        sortedCartPerSeller.push([item]);
      } else {
        sortedCartPerSeller[index].push(item);
      }
    });
    const orders: Order[] = [];
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      let index = 0;
      for (const sellerCartItems of sortedCartPerSeller) {
        const newOrder = new this.orderModel({
          clientId: userId,
          sellerId: sellerIdArray[index],
          paid: false,
          price: this.getTotal(sellerCartItems),
          products: sellerCartItems.map((item) => {
            return {
              ...item.product,
              reviews: [],
              amount: item.amount,
              status:
                item.product.collectType === 'DELIVERY'
                  ? 'waiting for delivery'
                  : 'not retrieved',
            };
          }),
          deliveryAddress: createOrderDto.deliveryAddress,
        });
        const savedOrder = await newOrder.save({ session: session });
        index++;
        orders.push(savedOrder);
      }

      for (const order of orders) {
        for (const soldProduct of order.products) {
          const res = await this.productModel
            .findOneAndUpdate(
              { _id: soldProduct._id },
              { $inc: { quantity: -1 * soldProduct.amount } },
            )
            .session(session);
        }
      }
      await session.commitTransaction();
      return orders;
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return false;
    } finally {
      session.endSession();
    }
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findOne({ _id: id }).exec();
    if (order) {
      return order;
    }
    throw new NotFoundException();
  }

  async findClientOrders(id: string) {
    return await this.orderModel.find({ clientId: id });
  }

  async findSellerOrders(id: string) {
    return await this.orderModel.find({ sellerId: id });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderModel.findById({ _id: id });
    if (order) {
      for (const prop in updateOrderDto) {
        order[prop] = updateOrderDto[prop];
      }
      try {
        return await order.save();
      } catch (err) {
        console.log(err);
      }
    }
    throw new NotFoundException('This order is does not match.');
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
