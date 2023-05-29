import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./book.entity";
import { IBookService } from "./interfaces/IBookService";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BookService implements IBookService {
  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>) {
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  public async findById(id: string): Promise<Book> {

    const book = await this.bookRepository.findOneBy({ id });
    if (book) {
      return book;
    }

    throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  }

  public async create(book: CreateBookDto): Promise<Book> {
    const bookToAdd = await this.bookRepository.create(book);
    await this.bookRepository.save(bookToAdd);

    return bookToAdd;
  }

  public async update(id: string, newBook: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findBy({ id });
    if (!book) {
      throw new Error("The book was not found.");
    } else {
      await this.bookRepository.update(id, newBook);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

}

