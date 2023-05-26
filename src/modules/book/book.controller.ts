import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res,
} from "@nestjs/common";

import { BookService } from "./book.service";
import { IUser } from "../user/interfaces/IUser";
import { CreateBookDto } from "./dto/create-book.dto";
import { IBook } from "./interfaces/IBook";
import { EditBookDto } from "./dto/edit-book.dto";
import { User } from "../../shared/decorator/user.decorator";
import { Book } from "../../shared/decorator/book.decorator";
import { ApiTags } from "@nestjs/swagger";


//@UseGuards(JwtGuard)
@ApiTags("books")
@Controller("books")
export class BookController {
  constructor(
    private bookService: BookService
  ) {
  }

  @Get()
  public async index( @Res() res) {
    const books = await this.bookService.findAll();
    return res.status(HttpStatus.OK).json(books);
  }

  @Post()
  public async create(
    @User() user: IUser,
    @Body() body: CreateBookDto,
    @Res() res
  ) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const book = await this.bookService.create(body);

    if (book) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Put("books/:id")
  public async update(
    @User() user: IUser,
    @Book() book: IBook,
    @Param("id") id: string,
    @Body() body: EditBookDto,
    @Res() res
  ) {
    if (user.id !== book.userId)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send("Unable to find the entry.");

    const updatedBook = await this.bookService.update(id, body);

    if (updatedBook) {
      return res.status(HttpStatus.NO_CONTENT).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Delete("books/:id")
  public async delete(
    @User() user: IUser,
    @Book() book: IBook,
    @Param("id") id: string,
    @Res() res
  ) {
    if (user.id !== book.userId)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send("Unable to find the entry.");

    const deletedBook = await this.bookService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedBook) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
