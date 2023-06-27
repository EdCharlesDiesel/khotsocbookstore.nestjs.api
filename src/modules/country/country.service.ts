import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICountryService } from "./interfaces/ICountryService";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { Country } from "./country.entity";

@Injectable()
export class CountryService implements ICountryService {
  constructor(@InjectRepository(Country) private readonly countryRepository: Repository<Country>) {
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  public async findById(id: string): Promise<Country> {

    const country = await this.countryRepository.findOneBy({ country_id: id });
    if (country) {
      return country;
    }

    throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
  }

  public async create(country: CreateCountryDto): Promise<Country> {
    const countryToAdd = await this.countryRepository.create(country);
    await this.countryRepository.save(countryToAdd);

    return countryToAdd;
  }

  public async update(id: string, newCountry: UpdateCountryDto): Promise<Country> {
    const country = await this.countryRepository.findBy({ country_id: id});
    if (!country) {
      throw new Error("The country was not found.");
    } else {
      await this.countryRepository.update(id, newCountry);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.countryRepository.delete(id);
  }

}

