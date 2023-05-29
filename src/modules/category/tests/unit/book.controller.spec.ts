import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "../../book.controller";
import { BookService } from "../../book.service";
import { CreateBookDto } from "../../dto/create-book.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import {v4 as uuidv4} from 'uuid';
describe('BooksController', () => {
    let booksController: BookController;
    let booksService: BookService;
    let request_: any;
    let user: IUser = {
        id: '1',
        firstName: '',
        lastName: 'Mokhethi',
        email: 'Mokhetkc@hotmail.com',
        birthday: new Date().getDate,
        idNumber: '515135135155',
        password: 'password',
        role: 'Admin',
        subscription: 'Full Access',
        username: 'EdCharles'
    }

    let createBook: CreateBookDto = {
        userId: user.firstName,
        cost: 300,
        coverFileName: 'pic.jpeg',
        publishedDate: new Date(),
        retailPrice: 100,
        title: "TypeScript"
    }

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
        let myuuid = uuidv4();
        let user: IUser = {
            id: myuuid,
            firstName: '',
            lastName: 'Mokhethi',
            email: 'Mokhetkc@hotmail.com',
            birthday: new Date().getDate,
            idNumber: '515135135155',
            password: 'password',
            role: 'Admin',
            subscription: 'Full Access',
            username: 'EdCharles'
        }

        let createBook: any = {
            userId: user.firstName,
            cost: 300,
            coverFileName: 'pic.jpeg',
            publishedDate: new Date(),
            retailPrice: 100,
            title: "TypeScript"
        }
        it('should create a book', () => {
            expect(booksController.create(user, createBook, request_)).resolves.toEqual({
id: myuuid,
                ...createBook,
            });
            expect(booksService.create).toHaveBeenCalled();
            expect(booksService.create).toHaveBeenCalledWith(createBook);
        });
    });

    describe('findAll()', () => {
        it('should find all books ', () => {
            booksController.getBooks(request_);
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
