import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from "uuid";
import { CustomerController } from "../../customer.controller";
import { CustomerService } from "../../customer.service";
import { CreateCustomerDto } from "../../dto/create-customer.dto";

describe("CustomerController", () => {
  let categorysController: CustomerController;
  let categorysService: CustomerService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((category: CreateCustomerDto) =>
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

    categorysController = app.get<CustomerController>(CustomerController);
    categorysService = app.get<CustomerService>(CustomerService);
  });


  describe("create()", () => {


    let createCustomer: CreateCustomerDto = {
      customer_id  :'',
      address: '',
      email: 'wsxcde@wee.com',
      first_name: 'Khotso',
      last_name: 'Mokhethi',
      password: '$ta99Ath0',
      phone_number: 112336688
    };

    let request: any;
    it("should create a category", () => {
      expect(categorysController.create(createCustomer,request)).resolves.toEqual({
        id: myuuid,
        ...createCustomer
      });
      expect(categorysService.create).toHaveBeenCalled();
      expect(categorysService.create).toHaveBeenCalledWith(createCustomer);
    });
  });

  describe("findAll()", () => {
    it("should find all categorys ", () => {
      categorysController.getCustomers(request_);
      expect(categorysService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a category', () => {
  //     categorysController.getCustomerById('1');
  //     expect(categorysService.findById('1')).toHaveBeenCalled();
  //     expect(categorysController.getCustomerById('1')).resolves.toEqual({
  //       categoryCustomered: 'lastName #1',
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
