import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidv4 } from "uuid";
import { ShipmentController } from "../../shipment.controller";
import { ShipmentService } from "../../shipment.service";
import { CreateShipmentDto } from "../../dto/create-shipment.dto";


describe("ShipmentController", () => {
  let shipmentsController: ShipmentController;
  let shipmentsService: ShipmentService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentController],
      providers: [
        {
          provide: ShipmentService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((shipment: CreateShipmentDto) =>
                Promise.resolve({ id: myuuid, ...shipment })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                shipment_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                shipment_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                shipment_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                shipment_id: "",
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

    shipmentsController = app.get<ShipmentController>(ShipmentController);
    shipmentsService = app.get<ShipmentService>(ShipmentService);
  });

  it("should be defined", () => {
    expect(shipmentsController).toBeDefined();
  });

  describe("create()", () => {
    let myuuid = uuidv4();

    let createShipment: CreateShipmentDto = {
      address: "",
      city: "",
      shipment_date: new Date(),
      country: "",
      province: "",
      zip_code: "0"
    };
    it.skip("should create a shipment", () => {
      expect(shipmentsController.create(createShipment, request_)).resolves.toEqual({
        id: myuuid,
        ...createShipment
      });
      expect(shipmentsService.create).toHaveBeenCalled();
      expect(shipmentsService.create).toHaveBeenCalledWith(createShipment);
    });
  });

  describe("findAll()", () => {
    it("should find all shipments ", () => {
      shipmentsController.getShipments(request_);
      expect(shipmentsService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a shipment', () => {
  //     shipmentsController.getShipmentById('1');
  //     expect(shipmentsService.findById('1')).toHaveBeenCalled();
  //     expect(shipmentsController.getShipmentById('1')).resolves.toEqual({
  //       shipmentShipmented: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the shipment', () => {
  //     shipmentsController.delete('2');
  //     expect(shipmentsService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
