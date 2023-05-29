import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IProductService } from "./interfaces/IProductService";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductService implements IProductService {
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  public async findById(id: string): Promise<Product> {

    const product = await this.productRepository.findOneBy({ product_id: id });
    if (product) {
      return product;
    }

    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  public async create(product: CreateProductDto): Promise<Product> {
    const productToAdd = await this.productRepository.create(product);
    await this.productRepository.save(productToAdd);

    return productToAdd;
  }

  public async update(id: string, newProduct: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findBy({ product_id: id });
    if (!product) {
      throw new Error("The product was not found.");
    } else {
      await this.productRepository.update(id, newProduct);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

}

