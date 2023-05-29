import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { Wishlist } from "./wishlist.entity";

@Injectable()
export class WishlistService {
  constructor(@InjectRepository(Wishlist) private readonly wishlistRepository: Repository<Wishlist>) {
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  public async findById(id: string): Promise<Wishlist> {

    const wishlist = await this.wishlistRepository.findOneBy({ wishlist_id: id });
    if (wishlist) {
      return wishlist;
    }

    throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
  }

  public async create(wishlist: CreateWishlistDto): Promise<Wishlist> {
    const wishlistToAdd = await this.wishlistRepository.create(wishlist);
    await this.wishlistRepository.save(wishlistToAdd);

    return wishlistToAdd;
  }

  // public async update(id: string, newWishlist: UpdateWishlistDto): Promise<Wishlist> {
  //   const wishlist = await this.wishlistRepository.findBy({ wishlist_id: id });
  //   if (!wishlist) {
  //     throw new Error("The wishlist was not found.");
  //   } else {
  //     await this.wishlistRepository.update(id, newWishlist);
  //     return;
  //   }
  // }

  public async delete(id: string): Promise<void> {
    await this.wishlistRepository.delete(id);
  }

}

