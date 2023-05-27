import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res,
} from "@nestjs/common";

import { AuthorService } from "./author.service";

import { IAuthor } from "./interfaces/IAuthor";
import { User } from "../../shared/decorator/user.decorator";
import { Author } from "../../shared/decorator/author.decorator";
import { ApiTags } from "@nestjs/swagger";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { IUser } from "../user/interfaces/IUser";


//@UseGuards(JwtGuard)
@ApiTags("Author")
@Controller("Author")
export class AuthorController {
  constructor(
    private authorService: AuthorService
  ) {
  }

  @Post()
  public async create(
    @User() user: IUser,
    @Body() body: CreateAuthorDto,
    @Res() res
  ) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const author = await this.authorService.create(body);

    if (author) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  public async index( @Res() res) {
    const authors = await this.authorService.findAll();
    return res.status(HttpStatus.OK).json(authors);
  }

  @Get(':id')
  public async getAuthor( @Param("id") id: string,@Res() res) {
    const authors = await this.authorService.findById(id);

    return res.status(HttpStatus.OK).json(authors);
  }

  @Put(":id")
  public async update(
    // @User() user: IUser,
    // @Author() author: IAuthor,
    id: string,
    @Body() body: UpdateAuthorDto,
    @Res() res
  ) {
    // if (user.id !== author.bookAuthored)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    const updatedAuthor = await this.authorService.update(id, body);
    await this.authorService.saveAsync(updatedAuthor);
    // if (updatedAuthor) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(
    // @User() user: IUser,
    // @Author() author: IAuthor,
     @Param("id") id: string,
     @Res() res
  ) {
    // if (user.id !== author.bookAuthored)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.authorService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedAuthor) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
