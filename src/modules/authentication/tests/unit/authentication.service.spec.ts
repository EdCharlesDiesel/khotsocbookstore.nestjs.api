import { TestingModule, Test } from "@nestjs/testing";
import { CreateAuthorDto } from "src/modules/author/dto/create-author.dto";
import { AuthenticationService } from "../../authentication.service";

const createAuthorDto: CreateAuthorDto = {
    firstName: 'firstName #1',
    lastName: 'lastName #1',
    bookAuthored: 'lastName #1'
  };
  
  describe('Authentication', () => {    
    let authenticationService: AuthenticationService;
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({        
        providers: [
          {
            provide: AuthenticationService,
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
  
      
      authenticationService = app.get<AuthenticationService>(AuthenticationService);
    });
  
    it('should be defined', () => {
      expect(authenticationService).toBeDefined();
    });
  
    // describe('create()', () => {
    //   it('should create a author', () => {
    //     expect(authorsController.create(createAuthorDto)).resolves.toEqual({
    //       id: '1',
    //       ...createAuthorDto,
    //     });
    //     expect(authorsService.create).toHaveBeenCalled();
    //     expect(authorsService.create).toHaveBeenCalledWith(createAuthorDto);
    //   });
    // });
  
    // describe('findAll()', () => {
    //   it('should find all authors ', () => {
    //     authorsController.getAllAuthors();
    //     expect(authorsService.findAll).toHaveBeenCalled();
    //   });
    // });
  
    // describe('findOne()', () => {
    //   it('should find a author', () => {
    //     authorsController.getAuthorById('1');
    //     expect(authorsService.findById('1')).toHaveBeenCalled();
    //     expect(authorsController.getAuthorById('1')).resolves.toEqual({
    //       bookAuthored: 'lastName #1',
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
  