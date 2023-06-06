import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Category")
@Controller("Category")
@ApiBearerAuth('defaultBearerAuth')
export class CategoryController {
  constructor(private categoryService: CategoryService) {
  }

  @Post()
  public async create(@Body() body: CreateCategoryDto, @Res() res) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const category = await this.categoryService.create(body);

    if (category) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  public async getCategories(@Res() res) {
 return  await this.categoryService.findAll();
  //  return res.status(HttpStatus.OK).json(categorys);
  }

  @Get(":id")
  public async getCategory(@Param("id") id: string, @Res() res) {
    const categorys = await this.categoryService.findById(id);

    return res.status(HttpStatus.OK).json(categorys);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser,  @Body() body: UpdateCategoryDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== category.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.categoryService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedCategory) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== category.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.categoryService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedCategory) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
