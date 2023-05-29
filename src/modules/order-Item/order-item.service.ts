import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { IOrderItemService } from "./interfaces/IOrderItemService";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";

@Injectable()
export class OrderItemService implements IOrderItemService {
  constructor(@InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>) {
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  public async findById(id: string): Promise<OrderItem> {

    const orderItem = await this.orderItemRepository.findOneBy({ id: id });
    if (orderItem) {
      return orderItem;
    }

    throw new HttpException('OrderItem not found', HttpStatus.NOT_FOUND);
  }

  public async create(orderItem: object): Promise<OrderItem> {
    const orderItemToAdd = await this.orderItemRepository.create(orderItem);
    await this.orderItemRepository.save(orderItemToAdd);

    return orderItemToAdd;
  }

  public async update(id: string, newOrderItem: any): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findBy({ id: id });
    if (!orderItem) {
      throw new Error("The orderItem was not found.");
    } else {
      await this.orderItemRepository.update(id, newOrderItem);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }

}

