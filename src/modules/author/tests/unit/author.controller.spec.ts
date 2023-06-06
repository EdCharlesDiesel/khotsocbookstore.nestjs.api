import { Test, TestingModule } from "@nestjs/testing";
import { AuthorController } from "../../author.controller";
import { AuthorService } from "../../author.service";
import { CreateAuthorDto } from "../../dto/create-author.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("AuthorController", () => {
  let authorsController: AuthorController;
  let authorsService: AuthorService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((author: CreateAuthorDto) =>
                Promise.resolve({ id: myuuid , ...author })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                author_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                author_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                author_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                author_id: "",
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

    authorsController = app.get<AuthorController>(AuthorController);
    authorsService = app.get<AuthorService>(AuthorService);
  });

  it("should be defined", () => {
    expect(authorsController).toBeDefined();
  });

  describe("create()", () => {


    let createAuthor: CreateAuthorDto = {
      firstName : "Khotso",
      lastName: "Mokhethi"
    };
    it("should create a author", () => {
      expect(authorsController.create(createAuthor)).resolves.toEqual({
        id: myuuid,
        ...createAuthor
      });
      expect(authorsService.create).toHaveBeenCalled();
      expect(authorsService.create).toHaveBeenCalledWith(createAuthor);
    });
  });

  describe("findAll()", () => {
    it("should find all authors ", () => {
      authorsController.getAllAuthors();
      expect(authorsService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a author', () => {
  //     authorsController.getAuthorById('1');
  //     expect(authorsService.findById('1')).toHaveBeenCalled();
  //     expect(authorsController.getAuthorById('1')).resolves.toEqual({
  //       authorAuthored: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the author', () => {
  //     authorsController.delete('2');
  //     expect(authorsService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
