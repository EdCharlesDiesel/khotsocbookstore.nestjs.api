import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post, Put, Res
} from "@nestjs/common";

import { CountryService } from "./country.service";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { User } from "../../shared/decorator/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { IUser } from "../user/interfaces/IUser";


@ApiTags("Country")
@Controller("Country")
//@ApiBearerAuth('defaultBearerAuth')
export class CountryController {
  constructor(private countryService: CountryService) {
  }

  @Post()
  public async create(@Body() body: CreateCountryDto) {
    // if (!body || (body && Object.keys(body).length === 0))
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .send("Missing some information.");

    return await this.countryService.create(body);

    // if (country) {
    //   return res.status(HttpStatus.CREATED).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }


  @Get()
  public async getCountries(@Res() res) {
 return  await this.countryService.findAll();
  //  return res.status(HttpStatus.OK).json(countrys);
  }

  @Get(":id")
  public async getCountry(@Param("id") id: string, @Res() res) {
    const countrys = await this.countryService.findById(id);

    return res.status(HttpStatus.OK).json(countrys);
  }

  @Put(":id")
  public async update(@Param("id") id: string, @User() user: IUser, @Body() body: UpdateCountryDto, @Res() res) {
    // console.log('id',id);
    // if (user.id !== country.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");
    await this.countryService.update(id, body);
   
    return res.status(HttpStatus.NO_CONTENT).send();

    // if (updatedCountry) {
    //   return res.status(HttpStatus.NO_CONTENT).send();
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    // }
  }

  @Delete(":id")
  public async delete(@User() user: IUser, @Param("id") id: string, @Res() res) {
    // if (user.id !== country.userId)
    //   return res
    //     .status(HttpStatus.NOT_FOUND)
    //     .send("Unable to find the entry.");

    await this.countryService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
    //TODO need to fix this.
    // if (deletedCountry) {
    // } else {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }
}
