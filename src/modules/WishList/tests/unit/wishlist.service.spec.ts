import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from '../../wishlist.service';



describe('BookService', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
      provide:  WishlistService,
        useValue:{}
      }],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});