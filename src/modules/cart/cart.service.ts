import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICartService } from "./interfaces/ICartService";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { Cart } from "./cart.entity";

@Injectable()
export class CartService implements ICartService {
  constructor(@InjectRepository(Cart) private readonly cartRepository: Repository<Cart>) {
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find();
  }

  public async findById(id: string): Promise<Cart> {

    const cart = await this.cartRepository.findOneBy({cart_id: id});
    if (cart) {
      return cart;
    }

    throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
  }

  public async create(cart: CreateCartDto): Promise<Cart> {
    const cartToAdd = await this.cartRepository.create(cart);
    await this.cartRepository.save(cartToAdd);

    return cartToAdd;
  }

  public async update(id: string, newCart: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartRepository.findBy({ cart_id: id });
    if (!cart) {
      throw new Error("The cart was not found.");
    } else {
      await this.cartRepository.update(id, newCart);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.cartRepository.delete(id);
  }

}

//TODO Will implement later
// getCarts(userId: string) {
//   return this.cartRepository.find({
//     where: {
//       cartId: userId
//     }
//   });
// }
//
// getCartmarkById(userId: string, cartId: string) {
//
// }




