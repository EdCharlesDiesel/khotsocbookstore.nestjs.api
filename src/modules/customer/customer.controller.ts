import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res, UploadedFile, UseInterceptors
} from "@nestjs/common";

import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { ICustomer } from "./interfaces/ICustomer";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileExtender } from "src/shared/decorator/FileInterceptor";


@ApiTags("Customer")
@Controller("Customer")
// @ApiBearerAuth('defaultBearerAuth')
export class CustomerController {
  constructor(private customerService: CustomerService) {
  }

  @Post()
  public async create(@Body() body: CreateCustomerDto) {
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
  public async getCustomers() {
    return await this.customerService.findAll();
    // const customers = await this.customerService.findAll();
    // return res.status(HttpStatus.OK).json(customers);
  }

  @Get(":id")
  public async getCustomer(@Param("id") id: string) {
    return await this.customerService.findById(id);

    //return res.status(HttpStatus.OK).json(customers);
  }

  @Put(":id")
  public async update(@Param("customer_id") customer_id: string, @Body() body: UpdateCustomerDto) {
    // console.log('id',id);
    // if (user.id !== customer.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.customerService.update(customer_id, body);

    // return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedCustomer) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string) {
    // if (user.id !== customer.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    return await this.customerService.delete(id);
    //return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedCustomer) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileExtender)
  @UseInterceptors(FileInterceptor('file'))

  
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageUrl = await this.customerService.uploadImage(file)
    // console.log(body, imageUrl)
    // return await this.service.punchInAttendance({
    //   comment: body.punchInComment,
    //   outletId: body.outletId,
    //   imgUrl: imageUrl,
    // })

    return;
  }
}
