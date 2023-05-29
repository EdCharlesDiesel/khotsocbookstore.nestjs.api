import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../product.entity";


export interface IProductService {
    findAll(): Promise<Array<Product>>;
    findById(id: string): Promise<Product | null>;
    create(book: CreateProductDto): Promise<Product>;
    update(id: string, newProduct: UpdateProductDto): Promise<Product | null>;
    delete(id: string): Promise<void>;
}
