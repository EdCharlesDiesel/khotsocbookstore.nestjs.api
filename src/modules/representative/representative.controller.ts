import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { RepresentativeService } from "./representative.service";
import { CreateRepresentativeDto } from "./dto/create-representative.dto";
import { UpdateRepresentativeDto } from "./dto/update-representative.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Representative")
@Controller("Representative")
//@ApiBearerAuth('defaultBearerAuth')
export class RepresentativeController {
  constructor(private representativeService: RepresentativeService) {
  }

  @Post()
  public async create(@Body() body: CreateRepresentativeDto, @Res() res) {
    // if (!body || (body && Object.keys(body).length === 0))
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send("Missing some information.");

    return await this.representativeService.create(body);

    // if (representative) {
    //   return res.status(HttpStatus.CREATED).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Get()
  public async getCountries(@Res() res) {
 return  await this.representativeService.findAll();
  //  return res.status(HttpStatus.OK).json(representatives);
  }

  @Get(":id")
  public async getCountry(@Param("id") id: string, @Res() res) {
    const representatives = await this.representativeService.findById(id);

    return res.status(HttpStatus.OK).json(representatives);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Body() body: UpdateRepresentativeDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== representative.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.representativeService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedCountry) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== representative.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.representativeService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedCountry) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
