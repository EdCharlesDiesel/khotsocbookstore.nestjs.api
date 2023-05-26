import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorRequest } from "./requests/create-author.request";
import { UpdateAuthorRequest } from "./requests/update-author.request";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CheckLoggedInUserGuard } from "../../shared/guards/check-loggedIn-user.guard";

@ApiTags("author")
@Controller("author")
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService
  ) {
  }


  // ApiProperty('index')
  @Get()
  public async get() {
    // this.client.send({ cmd: 'authors.index' }, {}).subscribe({
    //     next: authors => {
    //         res.status(HttpStatus.OK).json(authors);
    //     },
    //     error: error => {
    //         res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    //     }
    // });
  }

  @Post()
  public async create(@Body() body: CreateAuthorRequest) {
    const author = await this.authorService.create(body);
    if (!author) {
      return "error in creating author";
    }
    return "author created successfully";

  }

  // @Put('authors/:authorId')
  // // @UseGuards(CheckLoggedInUserGuard)
  // // @ApiBearerAuth()
  // public async update(authorId: string, @Body() body: UpdateAuthorRequest  ) {
  //     // this.client
  //     //     .send({ cmd: 'authors.update' }, { authorId, body, author: req.author })
  //     //     .subscribe({
  //     //         next: () => {
  //     //             res.status(HttpStatus.OK).send();
  //     //         },
  //     //         error: error => {
  //     //             res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  //     //         }
  //     //     });
  // }
  //
  // @Delete('authors/:authorId')
  // // @UseGuards(CheckLoggedInUserGuard)
  // // @ApiBearerAuth()
  // public async delete(@Param('authorId') authorId: string ) {
  //     // this.client
  //     //     .send({ cmd: 'authors.delete' }, { authorId, author: req.author })
  //     //     .subscribe({
  //     //         next: () => {
  //     //             res.status(HttpStatus.OK).send();
  //     //         },
  //     //         error: error => {
  //     //             res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
  //     //         }
  //     //     });
  // }
}


