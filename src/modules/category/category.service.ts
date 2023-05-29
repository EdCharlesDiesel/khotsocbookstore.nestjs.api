import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICategoryService } from "./interfaces/ICategoryService";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  public async findById(id: string): Promise<Category> {

    const category = await this.categoryRepository.findOneBy({ category_id: id });
    if (category) {
      return category;
    }

    throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  public async create(category: CreateCategoryDto): Promise<Category> {
    const categoryToAdd = await this.categoryRepository.create(category);
    await this.categoryRepository.save(categoryToAdd);

    return categoryToAdd;
  }

  public async update(id: string, newCategory: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findBy({ category_id: id});
    if (!category) {
      throw new Error("The category was not found.");
    } else {
      await this.categoryRepository.update(id, newCategory);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

}

