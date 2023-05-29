import {  Cart } from "../cart.entity";
import { CreateCartDto } from "../dto/create-cart.dto";
import { UpdateCartDto } from "../dto/update-cart.dto";


export interface ICartService {
    findAll(): Promise<Array<Cart>>;
    findById(id: string): Promise<Cart | null>;
    create(cart: CreateCartDto): Promise<Cart>;
    update(id: string, newCart: UpdateCartDto): Promise<Cart | null>;
    delete(id: string): Promise<void>;
}
