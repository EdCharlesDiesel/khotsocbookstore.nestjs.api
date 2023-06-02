import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../../product.service";
import { Product } from "../../product.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Cart } from "../../../cart/cart.entity";
import { Customer } from "../../../customer/customer.entity";
import { Wishlist } from "../../../wishList/wishlist.entity";
import { Order } from "../../../order/order.entity";
import { Payment } from "../../../payment/payment.entity";
import { Shipment } from "../../../shipment/shipment.entity";
import { OrderItem } from "../../../order-Item/order-item.entity";
import { Category } from "../../../category/category.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateProductDto } from "../../dto/create-product.dto";

let cartITEMS: Cart[] = [
  {
    cart_id: "",
    Customer_customer_id: new Customer(),
    Product_product_id: new Product(),
    quantity: 7
  }
];

let categories: Category[] = [
  {
    category_id: " ",
    product: new Product(),
    name: "Vaseline"
  }
];

let wishlists: Wishlist[] = [
  {
    wishlist_id: "",
    Product_product_id: new Product(),
    Customer_customer_id: new Customer()
  }
];

let orderItems: OrderItem[] = [
  {
    order_item_id: " ",
    order: new Order(),
    quantity: 33,
    price: 365,
    product: new Product()
  }
];

let orders: Order[] = [
  {
    order_id: "",
    order_date: new Date(),
    total_price: 400,
    Payment_payment_id: new Payment(),
    Shipment_shipment_id: new Shipment(),
    orderItems: orderItems,
    Customer_customer_id: new Order()

  }
];

const products: Product[] = [
  {
    product_id: "1",
    name: "My First Item",
    description: "The description of the first item",
    SKU: "",
    price: 3000,
    stock: 88,
    carts: cartITEMS,
    category: categories,
    orders: orders,
    wishlists: wishlists
  }
];

describe("ProductService", () => {
  let service: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("Method findAll", () => {
    it("it should return 1 item", async () => {
      jest.spyOn(productRepository, "find").mockResolvedValueOnce(products);
      const result = await service.findAll();
      expect(result.length).toEqual(1);
    });

    it("it must generate an error, findAll return an error", async () => {
      jest.spyOn(productRepository, "find").mockImplementation(() => {
        throw new HttpException("Products not found", HttpStatus.NOT_FOUND);
      });
      try {
        await service.findAll();
      } catch (err) {
        expect(err.message).toContain("Products not found");
      }
    });
  });

  describe("Method findById", () => {

    let product =
      {
        product_id: "1",
        name: "My First Item",
        description: "The description of the first item",
        SKU: "",
        price: 3000,
        stock: 88,
        carts: cartITEMS,
        category: categories,
        orders: orders,
        wishlists: wishlists
      };

    it("it should return 1 item", async () => {
      jest.spyOn(productRepository, "findOneBy").mockResolvedValueOnce(product);
      const result = await service.findById(product.product_id);
      expect(result).toEqual(product);
    });

    it("it must generate an error, findById return an error", async () => {
      jest.spyOn(productRepository, "findOneBy").mockImplementation(() => {
        throw  new HttpException("Product not found", HttpStatus.NOT_FOUND);
      });
      try {
        await service.findById(product.product_id);
      } catch (err) {
        expect(err.message).toContain("Product not found");
      }
    });
  });

  describe("Method create", () => {

    let product: CreateProductDto =
      {
        name: "My First Item",
        description: "The description of the first item",
        SKU: "",
        price: 3000,
        stock: 88
      };


    it.skip("it should create product resource", async () => {
      jest.spyOn(productRepository, "create").mockImplementation( () => {
        return new Product()
      });

      try {
        let expected = await service.create(product);
        await productRepository.save(product);
        expect(expected).toEqual(product);
      } catch (err) {
        expect(err.message).toContain("HttpStatus.BAD_REQUEST");
      }

    });

    it("it must generate an error, create return an error", async () => {
      jest.spyOn(productRepository, "create").mockImplementation(() => {
        throw  new HttpException("HttpStatus.BAD_REQUEST", HttpStatus.BAD_REQUEST);
      });
      try {
        await service.create(product);
      } catch (err) {
        expect(err.message).toContain("HttpStatus.BAD_REQUEST");
      }
    });
  });

  describe("Method update", () => {

    let product =
      {
        product_id: "1",
        name: "My First Item",
        description: "The description of the first item",
        SKU: "",
        price: 3000,
        stock: 88,
        carts: cartITEMS,
        category: categories,
        orders: orders,
        wishlists: wishlists
      };

    it("it should return 1 item", async () => {
      jest.spyOn(productRepository, "findOneBy").mockResolvedValueOnce(product);
      const result = await service.findById(product.product_id);
      expect(result).toEqual(product);
    });

    it("it must generate an error, findById return an error", async () => {
      jest.spyOn(productRepository, "findOneBy").mockImplementation(() => {
        throw  new HttpException("Product not found", HttpStatus.NOT_FOUND);
      });
      try {
        await service.findById(product.product_id);
      } catch (err) {
        expect(err.message).toContain("Product not found");
      }
    });
  });

  describe("Method delete", () => {

    let product =
      {
        product_id: "1",
        name: "My First Item",
        description: "The description of the first item",
        SKU: "",
        price: 3000,
        stock: 88,
        carts: cartITEMS,
        category: categories,
        orders: orders,
        wishlists: wishlists
      };

    it("it should return 1 item", async () => {
      jest.spyOn(productRepository, "findOneBy").mockResolvedValueOnce(product);
      const result = await service.findById(product.product_id);
      expect(result).toEqual(product);
    });

    it("it must generate an error, findById return an error", async () => {
      jest.spyOn(productRepository, "findOneBy").mockImplementation(() => {
        throw  new HttpException("Product not found", HttpStatus.NOT_FOUND);
      });
      try {
        await service.findById(product.product_id);
      } catch (err) {
        expect(err.message).toContain("Product not found");
      }
    });
  });

});





