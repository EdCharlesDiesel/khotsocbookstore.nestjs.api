import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { Category } from "../category.entity";


export interface ICategoryService {
    findAll(): Promise<Array<Category>>;
    findById(id: string): Promise<Category | null>;
    create(book: CreateCategoryDto): Promise<Category>;
    update(id: string, newCategory: UpdateCategoryDto): Promise<Category | null>;
    delete(id: string): Promise<void>;
}
