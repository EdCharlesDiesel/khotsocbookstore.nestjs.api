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
  let myuuid = uuidv4();

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
                Promise.resolve({ id: myuuid, ...product })
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
                product_id: "",
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

    let createProduct: CreateProductDto = {
      name: "Test Product",
      SKU: "DOO-yy",
      stock: 55,
      price: 300,
      description: "Test Product 1 "
    };
    it.skip("should create a product", () => {
      expect(productsController.create(createProduct, request_)).resolves.toEqual({
        id: myuuid,
        ...createProduct
      });
      expect(productsService.create).toHaveBeenCalled();
      expect(productsService.create).toHaveBeenCalledWith(createProduct);
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
  //     productsController.getProductById('1');
  //     expect(productsService.findById('1')).toHaveBeenCalled();
  //     expect(productsController.getProductById('1')).resolves.toEqual({
  //       productProducted: 'lastName #1',
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
