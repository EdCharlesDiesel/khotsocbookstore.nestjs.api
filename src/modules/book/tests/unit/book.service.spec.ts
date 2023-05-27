// import { Test } from '@nestjs/testing';
// import * as utilities from '../utilities';
// import * as crypto from 'crypto';
// import moment from 'moment';
// import { DatabaseModule } from '../../../../database/database.module';
// import { AuthorService } from 'src/modules/author/author.service';
// import { IAuthor } from 'src/modules/author/interfaces/IAuthor';
// import { userProvider } from 'src/modules/user/user.provider';
//
// describe('AuthorService', () => {
//     let Bookservice: AuthorService;
//     let fakeBooks: Array<any>;
//
//     beforeAll(async () => {
//         const module = await Test.createTestingModule({
//             imports: [DatabaseModule],
//             providers: [userProvider, AuthorService]
//         }).compile();
//
//         Bookservice = module.get<AuthorService>(AuthorService);
//     });
//
//     beforeEach(async () => {
//         await sequelizeInstance.sync();
//
//         return (fakeBooks = utilities.generateFakeBooks().map(user => {
//             user.password = crypto
//                 .createHmac('sha256', user.password)
//                 .digest('hex');
//             return user;
//         }));
//     });
//
//     it('should create a new user', async () => {
//         const user = await Bookservice.create(
//             Object.assign({}, fakeBooks[0], { password: 'dqzwfesgxrdhtfyjdg' })
//         );
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe(fakeBooks[0].email);
//         expect(user.firstName).toBe(fakeBooks[0].firstName);
//         expect(user.lastName).toBe(fakeBooks[0].lastName);
//         expect(user.birthday).toEqual(fakeBooks[0].birthday);
//         expect(user.password).toBe(fakeBooks[0].password);
//     });
//
//     it('should find all Books', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO Books ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeBooks[0].email}',
//                 '${fakeBooks[0].firstName}',
//                 '${fakeBooks[0].lastName}',
//                 '${fakeBooks[0].password}',
//                 '${fakeBooks[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const Books = await Bookservice.findAll();
//
//         expect(Books.length).toBe(1);
//         expect(Books[0]).not.toBeNull();
//         expect(Books[0].email).toBe(fakeBooks[0].email);
//         expect(Books[0].firstName).toBe(fakeBooks[0].firstName);
//         expect(Books[0].lastName).toBe(fakeBooks[0].lastName);
//         expect(Books[0].birthday).toEqual(fakeBooks[0].birthday);
//         expect(Books[0].password).toBe(fakeBooks[0].password);
//     });
//
//     it('should find one user', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO Books ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeBooks[0].email}',
//                 '${fakeBooks[0].firstName}',
//                 '${fakeBooks[0].lastName}',
//                 '${fakeBooks[0].password}',
//                 '${fakeBooks[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const user = await Bookservice.findOne();
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe(fakeBooks[0].email);
//         expect(user.firstName).toBe(fakeBooks[0].firstName);
//         expect(user.lastName).toBe(fakeBooks[0].lastName);
//         expect(user.birthday).toEqual(fakeBooks[0].birthday);
//         expect(user.password).toBe(fakeBooks[0].password);
//     });
//
//     it('should find user by id', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO Books ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeBooks[0].email}',
//                 '${fakeBooks[0].firstName}',
//                 '${fakeBooks[0].lastName}',
//                 '${fakeBooks[0].password}',
//                 '${fakeBooks[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const user = await Bookservice.findById(1);
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe(fakeBooks[0].email);
//         expect(user.firstName).toBe(fakeBooks[0].firstName);
//         expect(user.lastName).toBe(fakeBooks[0].lastName);
//         expect(user.birthday).toEqual(fakeBooks[0].birthday);
//         expect(user.password).toBe(fakeBooks[0].password);
//     });
//
//     it('should delete user by id', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO Books ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeBooks[0].email}',
//                 '${fakeBooks[0].firstName}',
//                 '${fakeBooks[0].lastName}',
//                 '${fakeBooks[0].password}',
//                 '${fakeBooks[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         await Bookservice.delete(1);
//         const Books = await Bookservice.findAll();
//
//         expect(Books.length).toBe(0);
//     });
//
//     it('should update user', async () => {
//         await sequelizeInstance.query(`
//             INSERT INTO Books ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
//             values(
//                 '${fakeBooks[0].email}',
//                 '${fakeBooks[0].firstName}',
//                 '${fakeBooks[0].lastName}',
//                 '${fakeBooks[0].password}',
//                 '${fakeBooks[0].birthday}',
//                 '${moment().format('YYYY-MM-DD')}',
//                 '${moment().format('YYYY-MM-DD')}'
//             );
//         `);
//
//         const user = await Bookservice.update(1, {
//             email: 'updated@test.fr'
//         } as IAuthor);
//
//         expect(user).not.toBeNull();
//         expect(user.email).toBe('updated@test.fr');
//         expect(user.firstName).toBe(fakeBooks[0].firstName);
//         expect(user.lastName).toBe(fakeBooks[0].lastName);
//         expect(user.birthday).toEqual(fakeBooks[0].birthday);
//         expect(user.password).toBe(fakeBooks[0].password);
//     });
// });
