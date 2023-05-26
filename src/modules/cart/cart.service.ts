import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICartService } from "./interfaces/ICartService";
import { CreateCartDto } from "./dto/create-cart.dto";
import { EditCartDto } from "./dto/edit-cart.dto";
import { Cart } from "./cart.entity";

@Injectable()
export class CartService implements ICartService {
  constructor(@InjectRepository(Cart) private readonly bookRepository: Repository<Cart>) {
  }

  findAll(): Promise<Cart[]> {
    return this.bookRepository.find();
  }

  public async findById(id: string): Promise<Cart> {

    const book = await this.bookRepository.findOneBy({id});
    if (book) {
      return book;
    }

    throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
  }

  public async create(book: CreateCartDto): Promise<Cart> {
    const bookToAdd = await this.bookRepository.create(book);
    await this.bookRepository.save(bookToAdd);

    return bookToAdd;
  }

  public async update(id: string, newCart: EditCartDto): Promise<Cart> {
    const book = await this.bookRepository.findBy({ id });
    if (!book) {
      throw new Error("The book was not found.");
    } else {
      await this.bookRepository.update(id, newCart);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

}

//TODO Will implement later
// getCarts(userId: string) {
//   return this.bookRepository.find({
//     where: {
//       bookId: userId
//     }
//   });
// }
//
// getCartmarkById(userId: string, bookId: string) {
//
// }




