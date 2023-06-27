import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "../../authentication.controller";
import { AuthenticationService } from "../../authentication.service";
import { v4 as uuidv4 } from "uuid";
import { LoginUserDto } from "../../dto/LoginUserDto";



describe("AuthenticationController", () => {
  let authenticationsController: AuthenticationController;
  let authenticationsService: AuthenticationService;
  let request_: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((authentication: LoginUserDto) =>
                Promise.resolve({ id: "1", ...authentication })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                authentication_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                authentication_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                authentication_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                authentication_id: "",
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

    authenticationsController = app.get<AuthenticationController>(AuthenticationController);
    authenticationsService = app.get<AuthenticationService>(AuthenticationService);
  });

  it("should be defined", () => {
    expect(authenticationsController).toBeDefined();
  });

  describe("create()", () => {
    let myuuid = uuidv4();

    let createAuthentication: LoginUserDto = {
      emailAddress: '',
      password: ""
    };
    it.skip("should create a authentication", () => {
      expect(authenticationsController.login(createAuthentication)).resolves.toEqual({
        id: myuuid,
        ...createAuthentication
      });
      expect(authenticationsService.login(createAuthentication)).toHaveBeenCalled();
      expect(authenticationsService.login(createAuthentication)).toHaveBeenCalledWith(createAuthentication);
    });
  });

  // describe("findAll()", () => {
  //   it("should find all authentications ", () => {
  //     authenticationsController.getAuthentications(request_);
  //     expect(authenticationsService.findAll).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne()', () => {
  //   it('should find a authentication', () => {
  //     authenticationsController.getAuthenticationById('1');
  //     expect(authenticationsService.findById('1')).toHaveBeenCalled();
  //     expect(authenticationsController.getAuthenticationById('1')).resolves.toEqual({
  //       authenticationAuthenticationed: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the authentication', () => {
  //     authenticationsController.delete('2');
  //     expect(authenticationsService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
