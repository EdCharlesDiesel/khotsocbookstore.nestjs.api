// import { Test } from '@nestjs/testing';
// import * as utilities from '../utilities';
// import * as crypto from 'crypto';
// import moment from 'moment';
// import { databaseProvider } from '../../../database/database.provider';
// import { AuthorService } from '../../user.service';
// import { userProvider } from '../../user.provider';
// import { IAuthor } from '../../interfaces/index';
// import { DatabaseModule } from '../../../database/database.module';
//
// describe('AuthorService', () => {
//     let sequelizeInstance: any;
//     let userService: AuthorService;
//     let fakeUsers: Array<any>;
//
//     beforeAll(async () => {
//         const module = await Test.createTestingModule({
//             imports: [DatabaseModule],
//             providers: [userProvider, AuthorService]
//         }).compile();
//
//         sequelizeInstance = module.get<any>(databaseProvider.provide);
//         userService = module.get<AuthorService>(AuthorService);
//     });
//
//     beforeEach(async () => {
//         await sequelizeInstance.sync();
//
//         return (fakeUsers = utilities.generateFakeUsers().map(user => {
//             user.password = crypto
//                 .createHmac('sha256', user.password)
//                 .digest('hex');
//             return user;
//         }));
//     });
//
//     it('should create a new user', async () => {
//         const user = await userService.create(
//             Object.assign({}, fakeUsers[0], { password: 'dqzwfesgxrdhtfyjdg' })
//         );
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe(fakeUsers[0].email);
//         expect(user.firstName).toBe(fakeUsers[0].firstName);
//         expect(user.lastName).toBe(fakeUsers[0].lastName);
//         expect(user.birthday).toEqual(fakeUsers[0].birthday);
//         expect(user.password).toBe(fakeUsers[0].password);
//     });
//
//     it('should find all users', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeUsers[0].email}',
//                 '${fakeUsers[0].firstName}',
//                 '${fakeUsers[0].lastName}',
//                 '${fakeUsers[0].password}',
//                 '${fakeUsers[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const users = await userService.findAll();
//
//         expect(users.length).toBe(1);
//         expect(users[0]).not.toBeNull();
//         expect(users[0].email).toBe(fakeUsers[0].email);
//         expect(users[0].firstName).toBe(fakeUsers[0].firstName);
//         expect(users[0].lastName).toBe(fakeUsers[0].lastName);
//         expect(users[0].birthday).toEqual(fakeUsers[0].birthday);
//         expect(users[0].password).toBe(fakeUsers[0].password);
//     });
//
//     it('should find one user', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeUsers[0].email}',
//                 '${fakeUsers[0].firstName}',
//                 '${fakeUsers[0].lastName}',
//                 '${fakeUsers[0].password}',
//                 '${fakeUsers[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const user = await userService.findOne();
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe(fakeUsers[0].email);
//         expect(user.firstName).toBe(fakeUsers[0].firstName);
//         expect(user.lastName).toBe(fakeUsers[0].lastName);
//         expect(user.birthday).toEqual(fakeUsers[0].birthday);
//         expect(user.password).toBe(fakeUsers[0].password);
//     });
//
//     it('should find user by id', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeUsers[0].email}',
//                 '${fakeUsers[0].firstName}',
//                 '${fakeUsers[0].lastName}',
//                 '${fakeUsers[0].password}',
//                 '${fakeUsers[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const user = await userService.findById(1);
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe(fakeUsers[0].email);
//         expect(user.firstName).toBe(fakeUsers[0].firstName);
//         expect(user.lastName).toBe(fakeUsers[0].lastName);
//         expect(user.birthday).toEqual(fakeUsers[0].birthday);
//         expect(user.password).toBe(fakeUsers[0].password);
//     });
//
//     it('should delete user by id', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeUsers[0].email}',
//                 '${fakeUsers[0].firstName}',
//                 '${fakeUsers[0].lastName}',
//                 '${fakeUsers[0].password}',
//                 '${fakeUsers[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         await userService.delete(1);
//         const users = await userService.findAll();
//
//         expect(users.length).toBe(0);
//     });
//
//     it('should update user', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeUsers[0].email}',
//                 '${fakeUsers[0].firstName}',
//                 '${fakeUsers[0].lastName}',
//                 '${fakeUsers[0].password}',
//                 '${fakeUsers[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const user = await userService.update(1, {
//             email: 'updated@test.fr'
//         } as IAuthor);
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe('updated@test.fr');
//         expect(user.firstName).toBe(fakeUsers[0].firstName);
//         expect(user.lastName).toBe(fakeUsers[0].lastName);
//         expect(user.birthday).toEqual(fakeUsers[0].birthday);
//         expect(user.password).toBe(fakeUsers[0].password);
//     });
// });
