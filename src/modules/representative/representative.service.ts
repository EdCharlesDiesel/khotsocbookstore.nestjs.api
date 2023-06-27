import {
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IRepresentativeService } from "./interfaces/IRepresentativeService";
import { CreateRepresentativeDto } from "./dto/create-representative.dto";
import { UpdateRepresentativeDto } from "./dto/update-representative.dto";
import { Representative } from "./representative.entity";

@Injectable()
export class RepresentativeService implements IRepresentativeService {
  constructor(@InjectRepository(Representative) private readonly representativeRepository: Repository<Representative>) {
  }

  findAll(): Promise<Representative[]> {
    return this.representativeRepository.find();
  }

  public async findById(id: string): Promise<Representative> {

    const representative = await this.representativeRepository.findOneBy({ representative_id: id });
    if (representative) {
      return representative;
    }

    throw new HttpException('Representative not found', HttpStatus.NOT_FOUND);
  }

  public async create(representative: CreateRepresentativeDto): Promise<Representative> {
    const representativeToAdd = await this.representativeRepository.create(representative);
    await this.representativeRepository.save(representativeToAdd);

    return representativeToAdd;
  }

  public async update(id: string, newRepresentative: UpdateRepresentativeDto): Promise<Representative> {
    const representative = await this.representativeRepository.findBy({ representative_id: id});
    if (!representative) {
      throw new Error("The representative was not found.");
    } else {
      await this.representativeRepository.update(id, newRepresentative);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.representativeRepository.delete(id);
  }

}

