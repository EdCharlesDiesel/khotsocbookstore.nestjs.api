import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { ShipmentService } from "./shipment.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";
import { User } from "../../shared/decorator/user.decorator";
import { CreateShipmentDto } from "./dto/create-shipment.dto";
import { UpdateShippingDto } from "./dto/update-shipping.dto";


@ApiTags("Shipment")
@Controller("Shipment")
@ApiBearerAuth('defaultBearerAuth')
export class ShipmentController {
  constructor(private shipmentService: ShipmentService) {
  }

  @Post()
  public async create( @Body() body: CreateShipmentDto, @Res() res) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const shipment = await this.shipmentService.create(body);

    if (shipment) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  public async getShipments(@Res() res) {
    return  await this.shipmentService.findAll();
  //  return res.status(HttpStatus.OK).json(shipments);
  }

  @Get(":id")
  public async getShipment(@Param("id") id: string, @Res() res) {
    const shipments = await this.shipmentService.findById(id);

    return res.status(HttpStatus.OK).json(shipments);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Body() body: UpdateShippingDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== shipment.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.shipmentService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedShipment) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser,  @Param("id") id: string, @Res() res) {
    // if (user.id !== shipment.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.shipmentService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedShipment) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
