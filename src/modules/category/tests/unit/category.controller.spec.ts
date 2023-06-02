import { Test, TestingModule } from "@nestjs/testing";
import { CategoryController } from "../../category.controller";
import { CategoryService } from "../../category.service";
import { CreateCategoryDto } from "../../dto/create-category.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("CategoryController", () => {
  let categorysController: CategoryController;
  let categorysService: CategoryService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreateCategoryDto) =>
                Promise.resolve({ id: myuuid , ...category })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                category_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                category_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                category_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                category_id: "",
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

    categorysController = app.get<CategoryController>(CategoryController);
    categorysService = app.get<CategoryService>(CategoryService);
  });


  describe("create()", () => {


    let createCategory: CreateCategoryDto = {
      name: 'Programming'
    };

    let request: any;
    it("should create a category", () => {
      expect(categorysController.create(createCategory,request)).resolves.toEqual({
        id: myuuid,
        ...createCategory
      });
      expect(categorysService.create).toHaveBeenCalled();
      expect(categorysService.create).toHaveBeenCalledWith(createCategory);
    });
  });

  describe("findAll()", () => {
    it("should find all categorys ", () => {
      categorysController.getCategories(request_);
      expect(categorysService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a category', () => {
  //     categorysController.getCategoryById('1');
  //     expect(categorysService.findById('1')).toHaveBeenCalled();
  //     expect(categorysController.getCategoryById('1')).resolves.toEqual({
  //       categoryCategoryed: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the category', () => {
  //     categorysController.delete('2');
  //     expect(categorysService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
