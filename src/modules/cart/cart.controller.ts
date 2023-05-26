import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res,
} from "@nestjs/common";

import { CartService } from "./cart.service";
import { IUser } from "../user/interfaces/IUser";
import { CreateCartDto } from "./dto/create-cart.dto";
import { ICart } from "./interfaces/ICart";
import { EditCartDto } from "./dto/edit-cart.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiTags } from "@nestjs/swagger";
import { Cart } from "../../shared/decorator/cart.decorator";


//@UseGuards(JwtGuard)
@ApiTags("carts")
@Controller("carts")
export class CartController {
  constructor(
    private cartService: CartService
  ) {
  }



  @Post()
  public async create(
    @User() user: IUser,
    @Body() body: CreateCartDto,
    @Res() res
  ) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const cart = await this.cartService.create(body);

    if (cart) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  public async index( @Res() res) {
    const carts = await this.cartService.findAll();
    return res.status(HttpStatus.OK).json(carts);
  }

  @Get(':id')
  public async getCart( @Param("id") id: string,@Res() res) {
    const carts = await this.cartService.findById(id);

    return res.status(HttpStatus.OK).json(carts);
  }

  @Put("carts/:id")
  public async update(
    @User() user: IUser,
    @Cart() cart: ICart,
    @Param("id") id: string,
    @Body() body: EditCartDto,
    @Res() res
  ) {
    if (user.id !== cart.userId)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send("Unable to find the entry.");

    const updatedCart = await this.cartService.update(id, body);

    if (updatedCart) {
      return res.status(HttpStatus.NO_CONTENT).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Delete("carts/:id")
  public async delete(
    @User() user: IUser,
    @Cart() cart: ICart,
    @Param("id") id: string,
    @Res() res
  ) {
    if (user.id !== cart.userId)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send("Unable to find the entry.");

    const deletedCart = await this.cartService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedCart) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
