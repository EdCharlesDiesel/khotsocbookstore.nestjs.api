// import { Test, TestingModule } from "@nestjs/testing";
// import { RepresentativeController } from "../../representative.controller";
// import { RepresentativeService } from "../../representative.service";
// import { CreateRepresentativeDto } from "../../dto/create-representative.dto";
// import { IUser } from "src/modules/user/interfaces/IUser";
// import { v4 as uuidv4 } from "uuid";
//
//
// describe("CountryController", () => {
//   let countrysController: RepresentativeController;
//   let countrysService: RepresentativeService;
//   let request_: any;
//   let myuuid = uuidv4();
//
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [RepresentativeController],
//       providers: [
//         {
//           provide: RepresentativeService,
//           useValue: {
//             create: jest
//               .fn()
//               .mockImplementation((country: CreateRepresentativeDto) =>
//                 Promise.resolve({ id: myuuid , ...country })
//               ),
//             findAll: jest.fn().mockResolvedValue([
//               {
//                 country_id: "",
//                 SKU: "",
//                 price: 362,
//                 stock: 22,
//                 name: "gbbvbbvb"
//               },
//               {
//                 country_id: "",
//                 SKU: "",
//                 price: 362,
//                 stock: 22,
//                 name: "gbbvbbvb"
//               },
//               {
//                 country_id: "",
//                 SKU: "",
//                 price: 362,
//                 stock: 22,
//                 name: "gbbvbbvb"
//               }
//             ]),
//             findOne: jest.fn().mockImplementation((id: string) =>
//               Promise.resolve({
//                 country_id: "",
//                 SKU: "",
//                 price: 362,
//                 stock: 22,
//                 name: "gbbvbbvb"
//               })
//             ),
//             remove: jest.fn()
//           }
//         }
//       ]
//     }).compile();
//
//     countrysController = app.get<RepresentativeController>(RepresentativeController);
//     countrysService = app.get<RepresentativeService>(RepresentativeService);
//   });
//
//
//   describe("create()", () => {
//
//
//     let createCountry: CreateRepresentativeDto = {
//       name: 'Programming'
//     };
//
//     let request: any;
//     it.skip("should create a country", () => {
//       expect(countrysController.create(createCountry,request)).resolves.toEqual({
//         id: myuuid,
//         ...createCountry
//       });
//       expect(countrysService.create).toHaveBeenCalled();
//       expect(countrysService.create).toHaveBeenCalledWith(createCountry);
//     });
//   });
//
//   describe("findAll()", () => {
//     it("should find all countrys ", () => {
//       countrysController.getCategories(request_);
//       expect(countrysService.findAll).toHaveBeenCalled();
//     });
//   });
//
//   // describe('findOne()', () => {
//   //   it('should find a country', () => {
//   //     countrysController.getCountryById('1');
//   //     expect(countrysService.findById('1')).toHaveBeenCalled();
//   //     expect(countrysController.getCountryById('1')).resolves.toEqual({
//   //       countryCountryed: 'lastName #1',
//   //       firstName: 'firstName #1',
//   //       lastName: 'lastName #1',
//   //       id: '1',
//   //     });
//   //   });
//   // });
//   //
//   // describe('remove()', () => {
//   //   it('should remove the country', () => {
//   //     countrysController.delete('2');
//   //     expect(countrysService.delete('2')).toHaveBeenCalled();
//   //   });
//   // });
// });
