import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { IUser, IUserService } from "./interfaces";

@Injectable()
export class UserService implements IUserService {
  constructor(

    @Inject('UserRepository') private readonly UserRepository: typeof User,

  ) {}

  public async findAll(options?: object): Promise<Array<User | null>> {

    return  null;
    //return await this.UserRepository.findAll<User>(options);
  }

  public async findOne(options?: object): Promise<User | null> {
    //return await this.UserRepository.findOne<User>(options);
    return  null
  }

  public async findById(id: number): Promise<User | null> {
    //return await this.UserRepository.findById<User>(id);
    return null;
  }

  public async create(user: IUser): Promise<User> {
    // return await this.sequelizeInstance.transaction(async (transaction) => {
    //   return await this.UserRepository.create<User>(user, {
    //     returning: true,
    //     transaction,
    //   });
    // });
    return new User()
  }

  public async update(id: number, newValue: IUser): Promise<User | null> {
    // return await this.sequelizeInstance.transaction(async (transaction) => {
    //   let user = await this.UserRepository.findById<User>(id, {
    //     transaction,
    //   });
    //   if (!user) throw new Error('The user was not found.');
    //
    //   user = this.databaseUtilitiesService.assign(user, newValue);
    //   return await user.save({
    //     returning: true,
    //     transaction,
    //   });
    // });
    return null;
  }

  public async delete(id: number): Promise<void> {
    // return await this.sequelizeInstance.transaction(async (transaction) => {
    //   return await this.UserRepository.destroy({
    //     where: { id },
    //     transaction,
    //   });
    // });

    return null
  }
}
