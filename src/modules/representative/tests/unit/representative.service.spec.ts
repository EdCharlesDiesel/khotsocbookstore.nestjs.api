import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from '../../country.service';



describe('CategoryService', () => {
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
      provide:  CountryService,
        useValue:{}
      }],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
