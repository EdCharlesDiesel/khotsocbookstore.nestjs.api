import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { ICustomer } from "./interfaces/ICustomer";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Customer")
@Controller("Customer")
@ApiBearerAuth('defaultBearerAuth')
export class CustomerController {
  constructor(private customerService: CustomerService) {
  }

  @Post()
  public async create( @Body() body: CreateCustomerDto, @Res() res) {
    // if (!body || (body && Object.keys(body).length === 0))
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send("Missing some information.");

    return await this.customerService.create(body);

  //   if (customer) {
  //     return res.status(HttpStatus.CREATED).send();
  //   } else {
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
  //   }
   }

  @Get()
  public async getCustomers(@Res() res) {
    return await this.customerService.findAll();
    // const customers = await this.customerService.findAll();
    // return res.status(HttpStatus.OK).json(customers);
  }

  @Get(":id")
  public async getCustomer(@Param("id") id: string, @Res() res) {
    const customers = await this.customerService.findById(id);

    return res.status(HttpStatus.OK).json(customers);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser,  @Body() body: UpdateCustomerDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== customer.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.customerService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedCustomer) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== customer.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.customerService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedCustomer) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
