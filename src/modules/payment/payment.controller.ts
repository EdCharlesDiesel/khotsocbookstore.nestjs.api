import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Payment")
@Controller("Payment")
@ApiBearerAuth('defaultBearerAuth')
export class PaymentController {
  constructor(private paymentService: PaymentService) {
  }

  @Post()
  public async create( @Body() body: CreatePaymentDto, @Res() res) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const payment = await this.paymentService.create(body);

    if (payment) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  public async getPayments(@Res() res) {
    const payments = await this.paymentService.findAll();
    return res.status(HttpStatus.OK).json(payments);
  }

  @Get(":id")
  public async getPayment(@Param("id") id: string, @Res() res) {
    const payments = await this.paymentService.findById(id);

    return res.status(HttpStatus.OK).json(payments);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Body() body: UpdatePaymentDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== payment.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.paymentService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedPayment) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser,  @Param("id") id: string, @Res() res) {
    // if (user.id !== payment.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.paymentService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedPayment) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
