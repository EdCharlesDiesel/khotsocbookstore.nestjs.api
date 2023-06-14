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
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("OrderItem")
@Controller("OrderItem")
@ApiBearerAuth('defaultBearerAuth')
export class OrderItemController {
  constructor(private order_ItemService: OrderItemService) {
  }

  @Post()
  public async create( @Body() body: CreateOrderItemDto, @Res() res) {
    // if (!body || (body && Object.keys(body).length === 0))
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send("Missing some information.");

    const order_Item = await this.order_ItemService.create(body);

    // if (order_Item) {
    //   return res.status(HttpStatus.CREATED).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Get()
  public async getOrder_Items(@Res() res) {
  return await  this.order_ItemService.findAll();
  //  return res.status(HttpStatus.OK).json(order_Items);
  }

  @Get(":id")
  public async getOrder_Item(@Param("id") id: string, @Res() res) {
    const order_Items = await this.order_ItemService.findById(id);

    return res.status(HttpStatus.OK).json(order_Items);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Body() body: UpdateOrderItemDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== order_Item.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.order_ItemService.update(id, body);

    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedOrder_Item) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== order_Item.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.order_ItemService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedOrder_Item) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
