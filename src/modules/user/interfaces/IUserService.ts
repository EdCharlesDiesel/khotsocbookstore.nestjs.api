import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../user.entity";
import { IUser } from "./IUser";

export interface IUserService {
    findAll(): Promise<Array<User>>;
    findOne(user: IUser): Promise<User | null>;
    findById(id: string): Promise<User | null>;    
    create(user: CreateUserDto): Promise<User>;
    update(id: string, newUser: UpdateUserDto): Promise<User | null>;
    delete(id: string): Promise<void>;
    login(email: string, password: string): Promise<User | null>;    
}
