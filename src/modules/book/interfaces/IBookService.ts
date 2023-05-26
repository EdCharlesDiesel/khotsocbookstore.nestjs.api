import { Book } from "../book.entity";
import { CreateBookDto } from "../dto/create-book.dto";
import { EditBookDto } from "../dto/edit-book.dto";


export interface IBookService {
    findAll(): Promise<Array<Book>>;
    findById(id: string): Promise<Book | null>;
    create(book: CreateBookDto): Promise<Book>;
    update(id: string, newBook: EditBookDto): Promise<Book | null>;
    delete(id: string): Promise<void>;
}
