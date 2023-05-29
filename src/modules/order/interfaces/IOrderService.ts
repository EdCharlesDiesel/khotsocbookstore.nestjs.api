import { Order } from "../order.entity";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";


export interface IOrderService {
    findAll(): Promise<Array<Order>>;
    findById(id: string): Promise<Order | null>;
    create(book: CreateOrderDto): Promise<Order>;
    update(id: string, newOrder: UpdateOrderDto): Promise<Order | null>;
    delete(id: string): Promise<void>;
}
