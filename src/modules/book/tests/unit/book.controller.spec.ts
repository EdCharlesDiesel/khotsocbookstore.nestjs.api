import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "../../book.controller";
import { UserService } from "src/modules/user/user.service";
import { JwtGuard } from "src/shared/guards/jwt.guard";
import { Book } from "../../book.entity";
import { BookService } from "../../book.service";
import { User } from "src/modules/user/user.entity";
const httpMocks = require("node-mocks-http");

describe("BookController", () => {
  let bookController: BookController;

  const mockRequest = httpMocks.createRequest();  

  const mockUser: User = {
    id: '1',
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    password: '',
    birthday: new Date(),
    role: '',
    subscription: ''
  };

  const mockBook: Book = {
    id: '1',
    coverFileName: '',
    title: '',
    cost: 0,
    retailPrice: 0,
    publishedDate: new Date(),
    userId: mockUser.firstName
  };


  const mockBookService = {
    createBook: jest
      .fn()
      .mockImplementation((user: User, book: Book) => {
        return {
          id: 1,
          ...book,
        };
      })
  };

  const mockUserService = {};

  // create fake module
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        { provide: UserService, useValue: mockUserService },
        {
          provide: JwtGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(BookService)
      .useValue(mockBookService)
      .compile();

    bookController = moduleRef.get<BookController>(BookController);
  });

  it("should create a book", () => {
    expect(bookController.create(mockUser, mockBook, mockRequest)).toEqual({
      id: expect.any(String),
      ...mockBook,
    });
  });
});