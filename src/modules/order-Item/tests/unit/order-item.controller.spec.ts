import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from "uuid";
import { OrderItemController } from "../../order-item.controller";
import { OrderItemService } from "../../order-item.service";
import { CreateOrderItemDto } from "../../dto/create-order-item.dto";

describe("OrderItemController", () => {
  let categorysController: OrderItemController;
  let categorysService: OrderItemService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [
        {
          provide: OrderItemService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreateOrderItemDto) =>
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

    categorysController = app.get<OrderItemController>(OrderItemController);
    categorysService = app.get<OrderItemService>(OrderItemService);
  });


  describe("create()", () => {


    let createOrderItem: CreateOrderItemDto = {
      price: 300,
      quantity: 62
    };

    let request: any;
    it("should create a category", () => {
      expect(categorysController.create(createOrderItem,request)).resolves.toEqual({
        id: myuuid,
        ...createOrderItem
      });
      expect(categorysService.create).toHaveBeenCalled();
      expect(categorysService.create).toHaveBeenCalledWith(createOrderItem);
    });
  });

  describe("findAll()", () => {
    it("should find all categorys ", () => {
      categorysController.getOrder_Items(request_);
      expect(categorysService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a category', () => {
  //     categorysController.getOrderItemById('1');
  //     expect(categorysService.findById('1')).toHaveBeenCalled();
  //     expect(categorysController.getOrderItemById('1')).resolves.toEqual({
  //       categoryOrderItemed: 'lastName #1',
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
