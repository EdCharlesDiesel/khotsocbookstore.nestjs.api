import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../category.service';



describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
      provide:  CategoryService,
        useValue:{}
      }],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
