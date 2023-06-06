import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../../user.controller";
import { UserService } from "../../user.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("UserController", () => {
  let usersController: UserController;
  let usersService: UserService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: myuuid , ...user })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                user_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                user_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                user_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                user_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              })
            ),
            remove: jest.fn()
          }
        }
      ]
    }).compile();

    usersController = app.get<UserController>(UserController);
    usersService = app.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(usersController).toBeDefined();
  });

  describe("create()", () => {


    let createUser: CreateUserDto = {
     firstName:'',
      birthday: new Date(),
      email: 'email@gmail.com',
      lastName: '',
      password:'',
      role: '',
      idNumber:'',
      subscription:'',
      username:''
    };
    it.skip("should create a user", () => {
      expect(usersController.create(createUser,request_)).resolves.toEqual({
        id: myuuid,
        ...createUser
      });
      expect(usersService.create).toHaveBeenCalled();
      expect(usersService.create).toHaveBeenCalledWith(createUser);
    });
  });

  describe("findAll()", () => {
    it("should find all users ", () => {
      usersController.getUsers(request_);
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a user', () => {
  //     usersController.getUserById('1');
  //     expect(usersService.findById('1')).toHaveBeenCalled();
  //     expect(usersController.getUserById('1')).resolves.toEqual({
  //       userUsered: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the user', () => {
  //     usersController.delete('2');
  //     expect(usersService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
