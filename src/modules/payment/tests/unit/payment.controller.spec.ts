import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from "uuid";
import { PaymentController } from "../../payment.controller";
import { PaymentService } from "../../payment.service";
import { CreatePaymentDto } from "../../dto/create-payment.dto";

describe("PaymentController", () => {
  let categorysController: PaymentController;
  let categorysService: PaymentService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreatePaymentDto) =>
                Promise.resolve({ id: myuuid, ...category })
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

    categorysController = app.get<PaymentController>(PaymentController);
    categorysService = app.get<PaymentService>(PaymentService);
  });


  describe("create()", () => {


    let createPayment: CreatePaymentDto = {
      payment_date: new Date(),
      payment_method: "Cash",
      amount: 9552
    };

    let request: any;
    it.skip("should create a category", () => {
      expect(categorysController.create(createPayment, request)).resolves.toEqual({
        id: myuuid,
        ...createPayment
      });
      expect(categorysService.create).toHaveBeenCalled();
      expect(categorysService.create).toHaveBeenCalledWith(createPayment);
    });
  });

  describe("findAll()", () => {
    it("should find all categorys ", () => {
      categorysController.getPayments(request_);
      expect(categorysService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a category', () => {
  //     categorysController.getPaymentById('1');
  //     expect(categorysService.findById('1')).toHaveBeenCalled();
  //     expect(categorysController.getPaymentById('1')).resolves.toEqual({
  //       categoryPaymented: 'lastName #1',
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
