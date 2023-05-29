import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { AuthorService } from "./author.service";
import { Author } from "../../shared/decorator/author.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";


@ApiTags("Author")
@Controller("Author")
@ApiBearerAuth('defaultBearerAuth')
export class AuthorController {
  constructor(
    private authorService: AuthorService
  ) {
  }

  @Post()
  public async create(
    // @User() user: IUser,
    @Body() body: CreateAuthorDto,
  //  @Res() res
  ) {
    // if (!body || (body && Object.keys(body).length === 0))
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send("Missing some information.");

    // const author = await this.authorService.create(body);
    return await this.authorService.create(body);

      //return res.status(HttpStatus.CREATED).send();
    // if (author) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Get()
  public  getAllAuthors() {
    return this.authorService.findAll();
    //return res.status(HttpStatus.OK).json(authors);
  }

  @Get(':id')
  public async getAuthorById(@Param("id") id: string) {
 await this.authorService.findById(id);

    // return res.status(HttpStatus.OK).json(authors);
  }

  @Put(":id")
  public async update(
    // @User() user: IUser,
    // @Author() author: IAuthor,
    @Param("id") id: string,
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
  public  delete(
    // @User() user: IUser,
    // @Author() author: IAuthor,
     @Param("id") id: string,
     // @Res() res
  ) {
    // if (user.id !== author.bookAuthored)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

     this.authorService.delete(id).then(x => console.log('Deleted item',x));
  //  return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedAuthor) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
