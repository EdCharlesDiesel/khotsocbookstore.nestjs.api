import { Injectable } from "@nestjs/common";
import { Author } from "./author.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IAuthorService } from "./interfaces/IAuthorService";
import { IAuthor } from "./interfaces/IAuthor";

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

  public async create(author: IAuthor): Promise<Author | null> {
    const authorToAdd = await this.authorRepository.create(author);
    await this.authorRepository.save(authorToAdd);

    return authorToAdd;
  }

  public async update(id: string, newValue: IAuthor): Promise<Author | null> {
    const author = await this.authorRepository.findBy({ id });
    if (!author) {
      throw new Error("The Author was not found.");
    } else {
      await this.authorRepository.update(id, newValue);
      await this.authorRepository.save(newValue);
      return null;
    }
  }

  public async delete(id: string): Promise<any> {
    await this.authorRepository.delete(id);
  };

  public async saveAsync(updatedAuthor: Author) {

  }
}
