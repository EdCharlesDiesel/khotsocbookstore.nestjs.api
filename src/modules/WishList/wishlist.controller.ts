import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,  Res
} from "@nestjs/common";

import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Wishlist")
@Controller("Wishlist")
@ApiBearerAuth('defaultBearerAuth')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {
  }

  @Post()
  public async create(@User() user: IUser, @Body() body: CreateWishlistDto, @Res() res) {
    if (!body || (body && Object.keys(body).length === 0))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Missing some information.");

    const wishlist = await this.wishlistService.create(body);

    if (wishlist) {
      return res.status(HttpStatus.CREATED).send();
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get()
  public async getWishlists(@Res() res) {
    const wishlists = await this.wishlistService.findAll();
    return res.status(HttpStatus.OK).json(wishlists);
  }

  @Get(":id")
  public async getWishlist(@Param("id") id: string, @Res() res) {
    const wishlists = await this.wishlistService.findById(id);

    return res.status(HttpStatus.OK).json(wishlists);
  }


  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== wishlist.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.wishlistService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedWishlist) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
