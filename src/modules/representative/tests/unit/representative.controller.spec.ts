import { Test, TestingModule } from "@nestjs/testing";
import { CountryController } from "../../country.controller";
import { CountryService } from "../../country.service";
import { CreateCountryDto } from "../../dto/create-country.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("CountryController", () => {
  let countrysController: CountryController;
  let countrysService: CountryService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((country: CreateCountryDto) =>
                Promise.resolve({ id: myuuid , ...country })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                country_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                country_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                country_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                country_id: "",
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

    countrysController = app.get<CountryController>(CountryController);
    countrysService = app.get<CountryService>(CountryService);
  });


  describe("create()", () => {


    let createCountry: CreateCountryDto = {
      name: 'Programming'
    };

    let request: any;
    it.skip("should create a country", () => {
      expect(countrysController.create(createCountry,request)).resolves.toEqual({
        id: myuuid,
        ...createCountry
      });
      expect(countrysService.create).toHaveBeenCalled();
      expect(countrysService.create).toHaveBeenCalledWith(createCountry);
    });
  });

  describe("findAll()", () => {
    it("should find all countrys ", () => {
      countrysController.getCategories(request_);
      expect(countrysService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a country', () => {
  //     countrysController.getCountryById('1');
  //     expect(countrysService.findById('1')).toHaveBeenCalled();
  //     expect(countrysController.getCountryById('1')).resolves.toEqual({
  //       countryCountryed: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the country', () => {
  //     countrysController.delete('2');
  //     expect(countrysService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
