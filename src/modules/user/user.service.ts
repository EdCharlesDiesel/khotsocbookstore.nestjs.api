import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUserService } from "./interfaces/IUserService";
import { toUserDto } from "../../shared/helper/mapper";
import { LoginUserDto } from "../authentication/dto/LoginUserDto";
import { IUser } from "./interfaces/IUser";
import { comparePasswords } from '../../shared/helper/utils';

@Injectable()
export class UserService implements IUserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  //FIXME We need to look at the return type.
  public async findOne(options?: object): Promise<any> {
    const userFromDatabase = await this.userRepository.findOne(options);
    if (userFromDatabase) {

      return toUserDto(userFromDatabase);
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }


  public async findById(id: string): Promise<User> {

    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }

    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  // public async create(user: CreateUserDto): Promise<User> {
  //   const userToAdd = await this.userRepository.create(user);
  //   await this.userRepository.save(userToAdd);
  //
  //   return userToAdd;
  // }

  //TODO need to fix the type.
  public async create(userDto: CreateUserDto): Promise<any> {
    //const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepository.findOne({
      where: { 
        username: userDto.username
       }
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: any = await this.userRepository.create(userDto);
    await this.userRepository.save(user);
    return user;
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
  public async login(email: string, password: string): Promise<User> {
    return new User;
  }

  public async findByLogin({ username, password }: LoginUserDto): Promise<IUser> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  public async findByPayload({ username }: any): Promise<IUser> {
    return await this.findOne({
      where:  { username } });
  }

}

