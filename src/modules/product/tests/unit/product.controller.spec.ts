import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "../../product.controller";
import { ProductService } from "../../product.service";
import { CreateProductDto } from "../../dto/create-product.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("ProductController", () => {
  let productsController: ProductController;
  let productsService: ProductService;
  let request_: any;
  // let user: IUser = {
  //     id: '1',
  //     firstName: '',
  //     lastName: 'Mokhethi',
  //     email: 'Mokhetkc@hotmail.com',
  //     birthday: new Date().getDate,
  //     idNumber: '515135135155',
  //     password: 'password',
  //     role: 'Admin',
  //     subscription: 'Full Access',
  //     username: 'EdCharles'
  // }

  // let createBook: CreateProductDto = {
  //     userId: user.firstName,
  //     cost: 300,
  //     coverFileName: 'pic.jpeg',
  //     publishedDate: new Date(),
  //     retailPrice: 100,
  //     title: "TypeScript"
  // }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((product: CreateProductDto) =>
                Promise.resolve({ id: "1", ...product })
              ),
            findAll: jest.fn().mockResolvedValue([
         {
                product_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
           {
                product_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
           {
                product_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                product_id: '',
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

    productsController = app.get<ProductController>(ProductController);
    productsService = app.get<ProductService>(ProductService);
  });

  it("should be defined", () => {
    expect(productsController).toBeDefined();
  });

  describe("create()", () => {
    let myuuid = uuidv4();
    let user: IUser = {
      id: myuuid,
      firstName: "",
      lastName: "Mokhethi",
      email: "Mokhetkc@hotmail.com",
      birthday: new Date().getDate,
      idNumber: "515135135155",
      password: "password",
      role: "Admin",
      subscription: "Full Access",
      username: "EdCharles"
    };

    let createBook: any = {
      userId: user.firstName,
      cost: 300,
      coverFileName: "pic.jpeg",
      publishedDate: new Date(),
      retailPrice: 100,
      title: "TypeScript"
    };
    it("should create a product", () => {
      expect(productsController.create( createBook, request_)).resolves.toEqual({
        id: myuuid,
        ...createBook
      });
      expect(productsService.create).toHaveBeenCalled();
      expect(productsService.create).toHaveBeenCalledWith(createBook);
    });
  });

  describe("findAll()", () => {
    it("should find all products ", () => {
      productsController.getProducts(request_);
      expect(productsService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a product', () => {
  //     productsController.getBookById('1');
  //     expect(productsService.findById('1')).toHaveBeenCalled();
  //     expect(productsController.getBookById('1')).resolves.toEqual({
  //       productBooked: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the product', () => {
  //     productsController.delete('2');
  //     expect(productsService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
