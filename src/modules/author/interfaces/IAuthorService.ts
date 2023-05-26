import { Author } from '../author.entity';
import { IAuthor } from '../interfaces/index';

export interface IAuthorService {
    findAll(): Promise<Array<Author>>;
    findById(id: string): Promise<Author | null>;
    create(author: IAuthor): Promise<Author>;
    update(id: string, newValue: IAuthor): Promise<Author | null>;
    delete(id: string): Promise<void>;
}
