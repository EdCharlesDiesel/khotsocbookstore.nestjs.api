import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { IOrderService } from "./interfaces/IOrderService";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService implements IOrderService {
  constructor(@InjectRepository(Order) private readonly orderItemRepository: Repository<Order>) {
  }

  findAll(): Promise<Order[]> {
    return this.orderItemRepository.find();
  }

  public async findById(id: string): Promise<Order> {

    const orderItem = await this.orderItemRepository.findOneBy({ order_id: id });
    if (orderItem) {
      return orderItem;
    }

    throw new HttpException('OrderItem not found', HttpStatus.NOT_FOUND);
  }

  public async create(orderItem: object | Order): Promise<Order> {
    const orderItemToAdd = await this.orderItemRepository.create(orderItem);
    await this.orderItemRepository.save(orderItemToAdd);

    return orderItemToAdd;
  }

  public async update(id: string, newOrderItem: UpdateOrderDto): Promise<Order> {
    const orderItem = await this.orderItemRepository.findBy({ order_id: id });
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

