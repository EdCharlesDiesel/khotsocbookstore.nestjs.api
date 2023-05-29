
import { CreateWishlistDto } from "../dto/create-wishlist.dto";
import { UpdateWishlistDto } from "../dto/update-wishlist.dto";
import { Wishlist } from "../wishlist.entity";


export interface IWishlistService {
    findAll(): Promise<Array<Wishlist>>;
    findById(id: string): Promise<Wishlist | null>;
    create(book: CreateWishlistDto): Promise<Wishlist>;
    update(id: string, newWishlist: UpdateWishlistDto): Promise<Wishlist | null>;
    delete(id: string): Promise<void>;
}
