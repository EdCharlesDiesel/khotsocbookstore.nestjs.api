import { CreateRepresentativeDto } from "../dto/create-representative.dto";
import { UpdateRepresentativeDto } from "../dto/update-representative.dto";
import { Representative } from "../representative.entity";



export interface IRepresentativeService {
    findAll(): Promise<Array<Representative>>;
    findById(id: string): Promise<Representative | null>;
    create(book: CreateRepresentativeDto): Promise<Representative>;
    update(id: string, newRepresentative: UpdateRepresentativeDto): Promise<Representative | null>;
    delete(id: string): Promise<void>;
}
