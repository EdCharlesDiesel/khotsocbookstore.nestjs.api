import { Injectable } from "@nestjs/common";
import { Author } from "./author.entity";
import { IAuthor, IAuthorService } from "./interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

//TODO use try catch
@Injectable()
export class AuthorService implements IAuthorService {
  constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>) {
  }

  public async findAll(options?: object): Promise<Array<Author | null>> {
    return await this.authorRepository.find();
  }

  public async findById(id: string): Promise<Author | null> {
    return await this.authorRepository.findOneBy({ id });
  }

  public async create(Author: IAuthor): Promise<Author | null> {
    console.log('Creating author',Author);
    return this.authorRepository.create(Author);
  }

  public async update(id: string, newValue: IAuthor): Promise<Author | null> {
    const author = await this.authorRepository.findBy({ id });
    if (!author) {
      throw new Error("The Author was not found.");
    } else {
      await this.authorRepository.update(id, newValue);
      return;
    }
  }

  public async delete(id: string): Promise<any> {
    await this.authorRepository.delete(id);
  };
}
