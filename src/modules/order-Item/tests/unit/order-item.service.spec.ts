import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from '../../order-item.service';



describe('BookService', () => {
  let service: OrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
      provide:  OrderItemService,
        useValue:{}
      }],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
