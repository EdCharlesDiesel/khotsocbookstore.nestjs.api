import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../product.service';



describe('BookService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
      provide:  ProductService,
        useValue:{}
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
