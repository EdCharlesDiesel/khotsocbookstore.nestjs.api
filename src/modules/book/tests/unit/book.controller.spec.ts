import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "../../book.controller";
import { BookService } from "../../book.service";
import { CreateBookDto } from "../../dto/create-book.dto";
import { IUser } from "src/modules/user/interfaces/IUser";




const createBookDto: CreateBookDto = {
  firstName: 'firstName #1',
  lastName: 'lastName #1',
  bookBooked: 'lastName #1'
};

describe('BooksController', () => {
  let booksController: BookController;
  let booksService: BookService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [ //  <---------- THIS IS THE MOST IMPORTANT SECTION TO SOLVE THIS ISSUE.
        {
          provide: BookService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((book: CreateBookDto) =>
                Promise.resolve({ id: '1', ...book }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                bookBooked: 'lastName #1'
              },
              {
                firstName: 'firstName #2',
                lastName: 'lastName #2',
                bookBooked: 'lastName #1'
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                firstName: 'firstName #1',
                lastName: 'lastName #1',
                bookBooked: 'lastName #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    booksController = app.get<BookController>(BookController);
    booksService = app.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  describe('create()', () => {
    let user: IUser = {        
        firstName: '',
        lastName : 'Mokhethi',
        email : 'Mokhetkc@hotmail.com',
        birthday : new Date().getDate,
    }
    it('should create a book', () => {
      expect(booksController.create(createBookDto)).resolves.toEqual({
        id: '1',
        ...createBookDto,
      });
      expect(booksService.create).toHaveBeenCalled();
      expect(booksService.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll()', () => {
    it('should find all books ', () => {
      booksController.getAllBooks();
      expect(booksService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a book', () => {
  //     booksController.getBookById('1');
  //     expect(booksService.findById('1')).toHaveBeenCalled();
  //     expect(booksController.getBookById('1')).resolves.toEqual({
  //       bookBooked: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the book', () => {
  //     booksController.delete('2');
  //     expect(booksService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
