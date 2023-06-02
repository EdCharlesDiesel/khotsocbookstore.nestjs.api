import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from "uuid";
import { OrderController } from "../../order.controller";
import { OrderService } from "../../order.service";
import { CreateOrderDto } from "../../dto/create-order.dto";

describe("OrderController", () => {
  let categorysController: OrderController;
  let categorysService: OrderService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreateOrderDto) =>
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

    categorysController = app.get<OrderController>(OrderController);
    categorysService = app.get<OrderService>(OrderService);
  });


  describe("create()", () => {


    let createOrder: CreateOrderDto = {
      order_date: new Date(),
      total_price: 3000
    };

    let request: any;
    it("should create a category", () => {
      expect(categorysController.create(createOrder,request)).resolves.toEqual({
        id: myuuid,
        ...createOrder
      });
      expect(categorysService.create).toHaveBeenCalled();
      expect(categorysService.create).toHaveBeenCalledWith(createOrder);
    });
  });

  describe("findAll()", () => {
    it("should find all categorys ", () => {
      categorysController.getOrders(request_);
      expect(categorysService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a category', () => {
  //     categorysController.getOrderById('1');
  //     expect(categorysService.findById('1')).toHaveBeenCalled();
  //     expect(categorysController.getOrderById('1')).resolves.toEqual({
  //       categoryOrdered: 'lastName #1',
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
