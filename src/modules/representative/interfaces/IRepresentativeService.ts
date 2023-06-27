import { CreateCountryDto } from "../dto/create-country.dto";
import { UpdateCountryDto } from "../dto/update-country.dto";
import { Country } from "../country.entity";



export interface ICountryService {
    findAll(): Promise<Array<Country>>;
    findById(id: string): Promise<Country | null>;
    create(book: CreateCountryDto): Promise<Country>;
    update(id: string, newCountry: UpdateCountryDto): Promise<Country | null>;
    delete(id: string): Promise<void>;
}
