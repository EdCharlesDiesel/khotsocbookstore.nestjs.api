import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Product")
@Controller("Product")
@ApiBearerAuth('defaultBearerAuth')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Post()
  @HttpCode(201)
    public async create( @Body() body: CreateProductDto,@Res() response) {
    if (!body || (body && Object.keys(body).length === 0))
    {
        response.status(HttpStatus.BAD_REQUEST)
         .send("Missing some information.");
    }else {
      const product = await this.productService.create(body);
      if (product) {
        return response.status(HttpStatus.CREATED).send();
      } else {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }

  @Get()
  public async getProducts(@Res() res) {
return  this.productService.findAll();
  //  return res.status(HttpStatus.OK).json(books);
  }

  @Get(":id")
  public async getProduct(@Param("id") id: string, @Res() res) {
    const books = await this.productService.findById(id);

    return res.status(HttpStatus.OK).json(books);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Body() body: UpdateProductDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== book.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.productService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedProduct) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== book.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.productService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedProduct) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
