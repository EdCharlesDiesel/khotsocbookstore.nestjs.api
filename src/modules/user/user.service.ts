import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUserService } from "./interfaces/IUserService";

@Injectable()
export class UserService implements IUserService {
 
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(user: any): Promise<User> {
    
    const userfromDatabase = await this.userRepository.findOneBy({ email: user.email, password: user.password });

    if (userfromDatabase) {
      return userfromDatabase;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
  

  public async findById(id: string): Promise<User> {

    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  public async create(user: CreateUserDto): Promise<User> {
    const userToAdd = await this.userRepository.create(user);
    await this.userRepository.save(userToAdd);

    return userToAdd;
  }

  public async update(id: string, newUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findBy({ id });
    if (!user) {
      throw new Error("The user was not found.");
    } else {
      await this.userRepository.update(id, newUser);
      return;
    }
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  //FIXME fix the loging service.
  public async login( email: string, password: string ) : Promise<User> {
    return new User;
  }

}

