import { TestingModule, Test } from "@nestjs/testing";
import { CreateAuthorDto } from "src/modules/author/dto/create-author.dto";
import { CartService } from "../../cart.service";

describe('CartService', () => {
    let cartService: CartService;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({          
          providers: [ //  <---------- THIS IS THE MOST IMPORTANT SECTION TO SOLVE THIS ISSUE.
            {
              provide: CartService,
              useValue: {
                create: jest
                  .fn()
                  .mockImplementation((author: CreateAuthorDto) =>
                    Promise.resolve({ id: '1', ...author }),
                  ),
                findAll: jest.fn().mockResolvedValue([
                  {
                    firstName: 'firstName #1',
                    lastName: 'lastName #1',
                    bookAuthored: 'lastName #1'
                  },
                  {
                    firstName: 'firstName #2',
                    lastName: 'lastName #2',
                    bookAuthored: 'lastName #1'
                  },
                ]),
                findOne: jest.fn().mockImplementation((id: string) =>
                  Promise.resolve({
                    firstName: 'firstName #1',
                    lastName: 'lastName #1',
                    bookAuthored: 'lastName #1',
                    id,
                  }),
                ),
                remove: jest.fn(),
              },
            },
          ],
        }).compile();
    
        cartService = app.get<CartService>(CartService);
   
      });
    
      it('should be defined', () => {
        expect(cartService).toBeDefined();
      });

    // it('should create a new user', async () => {
    //     const user = await userService.create(
    //         Object.assign({}, fakeUsers[0], { password: 'dqzwfesgxrdhtfyjdg' })
    //     );

    //     expect(user).not.toBeNull();
    //     expect(user.email).toBe(fakeUsers[0].email);
    //     expect(user.firstName).toBe(fakeUsers[0].firstName);
    //     expect(user.lastName).toBe(fakeUsers[0].lastName);
    //     expect(user.birthday).toEqual(fakeUsers[0].birthday);
    //     expect(user.password).toBe(fakeUsers[0].password);
    // });

    // it('should find all users', async () => {
    //     await sequelizeInstance.query(`
    //         INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
    //         values(
    //             '${fakeUsers[0].email}',
    //             '${fakeUsers[0].firstName}',
    //             '${fakeUsers[0].lastName}',
    //             '${fakeUsers[0].password}',
    //             '${fakeUsers[0].birthday}',
    //             '${moment().format('YYYY-MM-DD')}',
    //             '${moment().format('YYYY-MM-DD')}'
    //         );
    //     `);

    //     const users = await userService.findAll();

    //     expect(users.length).toBe(1);
    //     expect(users[0]).not.toBeNull();
    //     expect(users[0].email).toBe(fakeUsers[0].email);
    //     expect(users[0].firstName).toBe(fakeUsers[0].firstName);
    //     expect(users[0].lastName).toBe(fakeUsers[0].lastName);
    //     expect(users[0].birthday).toEqual(fakeUsers[0].birthday);
    //     expect(users[0].password).toBe(fakeUsers[0].password);
    // });

    // it('should find one user', async () => {
    //     await sequelizeInstance.query(`
    //         INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
    //         values(
    //             '${fakeUsers[0].email}',
    //             '${fakeUsers[0].firstName}',
    //             '${fakeUsers[0].lastName}',
    //             '${fakeUsers[0].password}',
    //             '${fakeUsers[0].birthday}',
    //             '${moment().format('YYYY-MM-DD')}',
    //             '${moment().format('YYYY-MM-DD')}'
    //         );
    //     `);

    //     const user = await userService.findOne();

    //     expect(user).not.toBeNull();
    //     expect(user.email).toBe(fakeUsers[0].email);
    //     expect(user.firstName).toBe(fakeUsers[0].firstName);
    //     expect(user.lastName).toBe(fakeUsers[0].lastName);
    //     expect(user.birthday).toEqual(fakeUsers[0].birthday);
    //     expect(user.password).toBe(fakeUsers[0].password);
    // });

    // it('should find user by id', async () => {
    //     await sequelizeInstance.query(`
    //         INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
    //         values(
    //             '${fakeUsers[0].email}',
    //             '${fakeUsers[0].firstName}',
    //             '${fakeUsers[0].lastName}',
    //             '${fakeUsers[0].password}',
    //             '${fakeUsers[0].birthday}',
    //             '${moment().format('YYYY-MM-DD')}',
    //             '${moment().format('YYYY-MM-DD')}'
    //         );
    //     `);

    //     const user = await userService.findById(1);

    //     expect(user).not.toBeNull();
    //     expect(user.email).toBe(fakeUsers[0].email);
    //     expect(user.firstName).toBe(fakeUsers[0].firstName);
    //     expect(user.lastName).toBe(fakeUsers[0].lastName);
    //     expect(user.birthday).toEqual(fakeUsers[0].birthday);
    //     expect(user.password).toBe(fakeUsers[0].password);
    // });

    // it('should delete user by id', async () => {
    //     await sequelizeInstance.query(`
    //         INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
    //         values(
    //             '${fakeUsers[0].email}',
    //             '${fakeUsers[0].firstName}',
    //             '${fakeUsers[0].lastName}',
    //             '${fakeUsers[0].password}',
    //             '${fakeUsers[0].birthday}',
    //             '${moment().format('YYYY-MM-DD')}',
    //             '${moment().format('YYYY-MM-DD')}'
    //         );
    //     `);

    //     await userService.delete(1);
    //     const users = await userService.findAll();

    //     expect(users.length).toBe(0);
    // });

    // it('should update user', async () => {
    //     await sequelizeInstance.query(`
    //         INSERT INTO users ("email", "firstName", "lastName", "password", "birthday", "createdAt", "updatedAt")
    //         values(
    //             '${fakeUsers[0].email}',
    //             '${fakeUsers[0].firstName}',
    //             '${fakeUsers[0].lastName}',
    //             '${fakeUsers[0].password}',
    //             '${fakeUsers[0].birthday}',
    //             '${moment().format('YYYY-MM-DD')}',
    //             '${moment().format('YYYY-MM-DD')}'
    //         );
    //     `);

    //     const user = await userService.update(1, {
    //         email: 'updated@test.fr'
    //     } as IAuthor);

    //     expect(user).not.toBeNull();
    //     expect(user.email).toBe('updated@test.fr');
    //     expect(user.firstName).toBe(fakeUsers[0].firstName);
    //     expect(user.lastName).toBe(fakeUsers[0].lastName);
    //     expect(user.birthday).toEqual(fakeUsers[0].birthday);
    //     expect(user.password).toBe(fakeUsers[0].password);
    // });
});
