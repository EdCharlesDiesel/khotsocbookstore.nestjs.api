import { Test, TestingModule } from "@nestjs/testing";
import { CartController } from "../../cart.controller";
import { CartService } from "../../cart.service";
import { CreateCartDto } from "../../dto/create-cart.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("CartController", () => {
  let cartsController: CartController;
  let cartsService: CartService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((cart: CreateCartDto) =>
                Promise.resolve({ id: myuuid , ...cart })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                cart_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                cart_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                cart_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                cart_id: "",
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

    cartsController = app.get<CartController>(CartController);
    cartsService = app.get<CartService>(CartService);
  });

  it("should be defined", () => {
    expect(cartsController).toBeDefined();
  });

  describe("create()", () => {


    let createCart: CreateCartDto = {
      quantity :333
    };

    let request: any;
    it("should create a cart", () => {
      expect(cartsController.create(createCart,request)).resolves.toEqual({
        id: myuuid,
        ...createCart
      });
      expect(cartsService.create).toHaveBeenCalled();
      expect(cartsService.create).toHaveBeenCalledWith(createCart);
    });
  });

  describe("findAll()", () => {
    it("should find all carts ", () => {
      cartsController.getAllCarts(request_);
      expect(cartsService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a cart', () => {
  //     cartsController.getCartById('1');
  //     expect(cartsService.findById('1')).toHaveBeenCalled();
  //     expect(cartsController.getCartById('1')).resolves.toEqual({
  //       cartCarted: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the cart', () => {
  //     cartsController.delete('2');
  //     expect(cartsService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
