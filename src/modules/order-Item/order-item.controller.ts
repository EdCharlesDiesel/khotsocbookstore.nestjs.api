import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { OrderItemService } from "./order-item.service";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { IOrderItem } from "./interfaces/IOrderItem";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { User } from "../../shared/decorator/user.decorator";
import { Book } from "../../shared/decorator/book.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("OrderItem")
@Controller("OrderItem")
@ApiBearerAuth('defaultBearerAuth')
export class OrderItemController {
  constructor(private bookService: OrderItemService) {
  }

  @Post()
  public async create(@User() user: IUser, @Body() body: CreateOrderItemDto, @Res() res) {
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
  public async update(@Param("id") id: string, @User() user: IUser, @Book() book: IOrderItem, @Body() body: UpdateOrderItemDto, @Res() res) {
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
  public async delete(@User() user: IUser, @Book() book: IOrderItem, @Param("id") id: string, @Res() res) {
    if (user.id !== book.userId)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send("Unable to find the entry.");

    await this.bookService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedBook) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
