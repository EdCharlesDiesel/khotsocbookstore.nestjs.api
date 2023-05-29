import { OrderItem } from "../order-item.entity";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";
import { UpdateOrderItemDto } from "../dto/update-order-item.dto";


export interface IOrderItemService {
    findAll(): Promise<Array<OrderItem>>;
    findById(id: string): Promise<OrderItem | null>;
    create(book: CreateOrderItemDto): Promise<OrderItem>;
    update(id: string, newOrderItem: UpdateOrderItemDto): Promise<OrderItem | null>;
    delete(id: string): Promise<void>;
}
