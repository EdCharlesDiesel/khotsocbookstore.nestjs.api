import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Order")
@Controller("Order")
@ApiBearerAuth('defaultBearerAuth')
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  @Post()
  public async create( @Body() body: CreateOrderDto, @Res() res) {
    // if (!body || (body && Object.keys(body).length === 0))
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send("Missing some information.");

    return await this.orderService.create(body);

    // if (order) {
    //   return res.status(HttpStatus.CREATED).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Get()
  public async getOrders(@Res() res) {
    return await this.orderService.findAll();
    // const orders = await this.orderService.findAll();
    // return res.status(HttpStatus.OK).json(orders);
  }

  @Get(":id")
  public async getOrder(@Param("id") id: string, @Res() res) {
    const orders = await this.orderService.findById(id);

    return res.status(HttpStatus.OK).json(orders);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser,  @Body() body: UpdateOrderDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== order.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.orderService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedOrder) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser,  @Param("id") id: string, @Res() res) {
    // if (user.id !== order.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.orderService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedOrder) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
