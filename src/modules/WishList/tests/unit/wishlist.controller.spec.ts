import { Test, TestingModule } from "@nestjs/testing";
import { WishlistController } from "../../wishlist.controller";
import { WishlistService } from "../../wishlist.service";
import { CreateWishlistDto } from "../../dto/create-wishlist.dto";
import { IUser } from "src/modules/user/interfaces/IUser";
import { v4 as uuidv4 } from "uuid";


describe("WishlistController", () => {
  let wishlistsController: WishlistController;
  let wishlistsService: WishlistService;
  let request_: any;
  let myuuid = uuidv4();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [
        {
          provide: WishlistService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((wishlist: CreateWishlistDto) =>
                Promise.resolve({ id: myuuid , ...wishlist })
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                wishlist_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                wishlist_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              },
              {
                wishlist_id: "",
                SKU: "",
                price: 362,
                stock: 22,
                name: "gbbvbbvb"
              }
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                wishlist_id: "",
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

    wishlistsController = app.get<WishlistController>(WishlistController);
    wishlistsService = app.get<WishlistService>(WishlistService);
  });

  it("should be defined", () => {
    expect(wishlistsController).toBeDefined();
  });

  describe("create()", () => {


    let createWishlist: CreateWishlistDto = {

    };
    it.skip("should create a wishlist", () => {
      expect(wishlistsController.create(createWishlist,request_)).resolves.toEqual({
        id: myuuid,
        ...createWishlist
      });
      expect(wishlistsService.create).toHaveBeenCalled();
      expect(wishlistsService.create).toHaveBeenCalledWith(createWishlist);
    });
  });

  describe("findAll()", () => {
    it("should find all wishlists ", () => {
      wishlistsController.getWishlists(request_);
      expect(wishlistsService.findAll).toHaveBeenCalled();
    });
  });

  // describe('findOne()', () => {
  //   it('should find a wishlist', () => {
  //     wishlistsController.getWishlistById('1');
  //     expect(wishlistsService.findById('1')).toHaveBeenCalled();
  //     expect(wishlistsController.getWishlistById('1')).resolves.toEqual({
  //       wishlistWishlisted: 'lastName #1',
  //       firstName: 'firstName #1',
  //       lastName: 'lastName #1',
  //       id: '1',
  //     });
  //   });
  // });
  //
  // describe('remove()', () => {
  //   it('should remove the wishlist', () => {
  //     wishlistsController.delete('2');
  //     expect(wishlistsService.delete('2')).toHaveBeenCalled();
  //   });
  // });
});
