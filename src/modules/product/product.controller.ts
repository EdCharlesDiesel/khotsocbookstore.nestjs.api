import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { IProduct } from "./interfaces/IProduct";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../../shared/decorator/user.decorator";
import { Book } from "../../shared/decorator/book.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Product")
@Controller("Product")
@ApiBearerAuth('defaultBearerAuth')
export class ProductController {
  constructor(private bookService: ProductService) {
  }

  @Post()
  public async create(@User() user: IUser, @Body() body: CreateProductDto, @Res() res) {
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

  @Get()
  public async getBooks(@Res() res) {
    const books = await this.bookService.findAll();
    return res.status(HttpStatus.OK).json(books);
  }

  @Get(":id")
  public async getBook(@Param("id") id: string, @Res() res) {
    const books = await this.bookService.findById(id);

    return res.status(HttpStatus.OK).json(books);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Book() book: IProduct, @Body() body: UpdateProductDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== book.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.bookService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedBook) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Book() book: IProduct, @Param("id") id: string, @Res() res) {
    // if (user.id !== book.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.bookService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedBook) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
